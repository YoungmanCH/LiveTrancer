import queue
import re
import sys
import time
import pyaudio
import asyncio
from google.cloud import speech
import openai
import os

# Load Voicevox Speaker module from the audio-processing path
current_dir = os.path.dirname(__file__)
voicevox_dir = os.path.join(current_dir, '../../audio-processing/src')
sys.path.append(voicevox_dir)
import voicevox

# Audio recording parameters
STREAMING_LIMIT = 240000  # 4 minutes limit
SAMPLE_RATE = 44100  # High-quality sample rate
CHUNK_SIZE = int(SAMPLE_RATE / 10)  # 100ms chunks
PHRASE_PAUSE = 0.8  # Pause between phrases for sentence boundaries

# Initialize Voicevox speaker
voice = voicevox.Speaker()

# Define a class for handling microphone input stream
class ResumableMicrophoneStream:
    def __init__(self, rate, chunk_size):
        self._rate = rate
        self.chunk_size = chunk_size
        self._num_channels = 1
        self._buff = queue.Queue()
        self.closed = True
        self.start_time = int(round(time.time() * 1000))
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
        while not self.closed:
            chunk = self._buff.get()
            if chunk is None:
                return
            yield chunk

async def process_and_speak(transcript):
    processed_text = process_text_with_chatgpt(transcript)
    print(f"Processed Text: {processed_text}")

    # Voicevoxのspeakメソッドを適切に呼び出し
    voice.add_text(processed_text)  # テキストを追加
    await asyncio.to_thread(voice.start_speaking)  # スレッドで再生開始


# OpenAIのAPIキーを環境変数から取得（APIキーは適宜セットしてください）
openai.api_key = os.getenv("OPENAI_API_KEY")

def process_text_with_chatgpt(transcript):
    """ChatGPT 4-omniを使用して、テキストを加工する関数"""
    prompt = (
        "「{}」を、専門用語を噛み砕きつつ高校生レベルにも分かりやすいよう言い直してください。"
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

# Function to process audio and handle phrase detection
async def listen_print_loop(responses):
    last_speech_time = time.time()
    
    for response in responses:
        if not response.results:
            continue
        result = response.results[0]
        transcript = result.alternatives[0].transcript

        # Phrase detection based on punctuation or a long pause
        if re.search(r'[。！？]', transcript) or time.time() - last_speech_time > PHRASE_PAUSE:
            result.is_final = True

        if result.is_final:
            print(f"Final: {transcript}")
            last_speech_time = time.time()  # Update timestamp after final sentence
            await process_and_speak(transcript)  # Process and speak

# Start the speech recognition and real-time text-to-speech processing
async def main():
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

    with mic_manager as stream:
        audio_generator = stream.generator()
        requests = (
            speech.StreamingRecognizeRequest(audio_content=content)
            for content in audio_generator
        )
        responses = client.streaming_recognize(streaming_config, requests)
        await listen_print_loop(responses)

if __name__ == "__main__":
    asyncio.run(main())