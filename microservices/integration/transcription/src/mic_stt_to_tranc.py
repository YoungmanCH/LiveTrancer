import queue
import re
import sys
import time
import os
from google.cloud import speech
import pyaudio
import openai  # ChatGPT API用ライブラリ

# Audio recording parameters
STREAMING_LIMIT = 240000  # 4 minutes
SAMPLE_RATE = 16000
CHUNK_SIZE = int(SAMPLE_RATE / 10)  # 100ms
SILENCE_THRESHOLD = 1.0  # 無音を検出するためのしきい値（秒）
PHRASE_PAUSE = 0.8  # フレーズ区切りのポーズ（秒）

RED = "\033[0;31m"
GREEN = "\033[0;32m"
YELLOW = "\033[0;33m"

def get_current_time() -> int:
    """Return Current Time in MS."""
    return int(round(time.time() * 1000))

class ResumableMicrophoneStream:
    """Opens a recording stream as a generator yielding the audio chunks."""

    def __init__(self, rate, chunk_size):
        self._rate = rate
        self.chunk_size = chunk_size
        self._num_channels = 1
        self._buff = queue.Queue()
        self.closed = True
        self.start_time = get_current_time()
        self.restart_counter = 0
        self.audio_input = []
        self.last_audio_input = []
        self.result_end_time = 0
        self.is_final_end_time = 0
        self.final_request_end_time = 0
        self.bridging_offset = 0
        self.last_transcript_was_final = False
        self.new_stream = True
        self.silence_start = None  # 無音の開始時間
        self._audio_interface = pyaudio.PyAudio()
        self._audio_stream = self._audio_interface.open(
            format=pyaudio.paInt16,
            channels=self._num_channels,
            rate=self._rate,
            input=True,
            frames_per_buffer=self.chunk_size,
            stream_callback=self._fill_buffer,
        )

    def __enter__(self):
        self.closed = False
        return self

    def __exit__(self, type, value, traceback):
        self._audio_stream.stop_stream()
        self._audio_stream.close()
        self.closed = True
        self._buff.put(None)
        self._audio_interface.terminate()

    def _fill_buffer(self, in_data, *args, **kwargs):
        self._buff.put(in_data)
        return None, pyaudio.paContinue

    def generator(self):
        """Stream Audio from microphone to API and to local buffer."""
        while not self.closed:
            data = []

            if self.new_stream and self.last_audio_input:
                chunk_time = STREAMING_LIMIT / len(self.last_audio_input)

                if chunk_time != 0:
                    if self.bridging_offset < 0:
                        self.bridging_offset = 0

                    if self.bridging_offset > self.final_request_end_time:
                        self.bridging_offset = self.final_request_end_time

                    chunks_from_ms = round(
                        (self.final_request_end_time - self.bridging_offset)
                        / chunk_time
                    )

                    self.bridging_offset = round(
                        (len(self.last_audio_input) - chunks_from_ms) * chunk_time
                    )

                    for i in range(chunks_from_ms, len(self.last_audio_input)):
                        data.append(self.last_audio_input[i])

                self.new_stream = False

            chunk = self._buff.get()
            self.audio_input.append(chunk)

            if chunk is None:
                return
            data.append(chunk)

            while True:
                try:
                    chunk = self._buff.get(block=False)
                    if chunk is None:
                        return
                    data.append(chunk)
                    self.audio_input.append(chunk)
                except queue.Empty:
                    break

            yield b"".join(data)

def process_text_with_chatgpt(transcript):
    """ChatGPT 4-omniを使用して、テキストを加工する関数"""
    prompt = (
        "「{}」を、専門用語を噛み砕きつつ高校生にも分かりやすいよう言い直してください。"
        "字数はあまり変えないで。想定としては音声出力をします。"
    ).format(transcript)

    # ChatCompletion.create を使用
    response = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=150,
        temperature=0.7
    )
    
    # ChatGPTからの生成テキストを取得
    return response.choices[0].message.content.strip()

def save_to_file(text):
    """加工したテキストをファイルに保存"""
    with open("processed_output.txt", "a", encoding="utf-8") as file:
        file.write(text + "\n")
        
def listen_print_loop(responses, stream):
    num_chars_printed = 0
    last_speech_time = time.time()
    previous_transcript = ""  # Store the previous final transcript

    for response in responses:
        if get_current_time() - stream.start_time > STREAMING_LIMIT:
            stream.start_time = get_current_time()
            break

        if not response.results:
            continue

        result = response.results[0]
        transcript = result.alternatives[0].transcript
        new_part = ""

        # Check if the phrase or pause indicates the end of a sentence
        if re.search(r'[。！？]', transcript) or time.time() - last_speech_time > PHRASE_PAUSE:
            result.is_final = True

        if result.is_final:
            print(f"previous_transcript: {previous_transcript}")
            print(f"transcript: {transcript}")
            
            # Extract only the new part by removing the previous final transcript from the current one
            new_part = transcript[len(previous_transcript):]
            print(f"new_part: {new_part}")

            # Output the new part
            sys.stdout.write(GREEN)
            sys.stdout.write("\033[K")
            sys.stdout.write(f"Final: {new_part}\n")

            # Process with ChatGPT 4-omni
            processed_text = process_text_with_chatgpt(new_part)
            save_to_file(processed_text)
            sys.stdout.write(f"Processed: {processed_text}\n")

            # Update previous_transcript for future comparison
            previous_transcript = transcript
            num_chars_printed = 0
            stream.last_transcript_was_final = True
            last_speech_time = time.time()  # Update the pause timestamp
        else:
            sys.stdout.write(RED)
            sys.stdout.write(f"Interim: {transcript}\r")  # Print interim transcript
            stream.last_transcript_was_final = False

def main():
    client = speech.SpeechClient()
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=SAMPLE_RATE,
        language_code="ja-JP",
        max_alternatives=1,
    )

    streaming_config = speech.StreamingRecognitionConfig(
        config=config, interim_results=True
    )

    mic_manager = ResumableMicrophoneStream(SAMPLE_RATE, CHUNK_SIZE)
    sys.stdout.write('\nListening, say "終了" to stop.\n\n')
    sys.stdout.write("End (ms)       Transcript Results/Status\n")
    sys.stdout.write("=====================================================\n")

    with mic_manager as stream:
        while not stream.closed:
            audio_generator = stream.generator()
            requests = (
                speech.StreamingRecognizeRequest(audio_content=content)
                for content in audio_generator
            )

            responses = client.streaming_recognize(streaming_config, requests)

            # Now, put the transcription responses to use.
            listen_print_loop(responses, stream)


if __name__ == "__main__":
    main()
