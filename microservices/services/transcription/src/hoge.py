from __future__ import division
import re
import sys
import os
import time
from google.cloud import speech
import pyaudio
from six.moves import queue

# sumaryディレクトリのtextTrancer_OpenAIモジュールをインポート
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../summary/test/rubbish/')))
import textTrancer_OpenAI  # OpenAIベースの変換クラスをインポート

# 録音のパラメータ
RATE = 16000
CHUNK = int(RATE / 10)  # 100ms

# OpenAIのテキスト変換クラスを初期化
text_transer = textTrancer_OpenAI.Text_Transer_OpenAI()

class MicrophoneStream(object):
    """録音ストリームを生成し、音声データを逐次返すジェネレーターを提供"""
    def __init__(self, rate, chunk):
        self._rate = rate
        self._chunk = chunk
        self._buff = queue.Queue()
        self.closed = True

    def __enter__(self):
        self._audio_interface = pyaudio.PyAudio()
        self._audio_stream = self._audio_interface.open(
            format=pyaudio.paInt16,
            channels=1,
            rate=self._rate,
            input=True,
            frames_per_buffer=self._chunk,
            stream_callback=self._fill_buffer,
        )
        self.closed = False
        return self

    def __exit__(self, type, value, traceback):
        self._audio_stream.stop_stream()
        self._audio_stream.close()
        self.closed = True
        self._buff.put(None)
        self._audio_interface.terminate()

    def _fill_buffer(self, in_data, frame_count, time_info, status_flags):
        self._buff.put(in_data)
        return None, pyaudio.paContinue

    def generator(self):
        while not self.closed:
            chunk = self._buff.get()
            if chunk is None:
                return
            data = [chunk]
            while True:
                try:
                    chunk = self._buff.get(block=False)
                    if chunk is None:
                        return
                    data.append(chunk)
                except queue.Empty:
                    break
            yield b"".join(data)

def listen_print_loop(responses):
    num_chars_printed = 0
    for response in responses:
        if not response.results:
            continue
        result = response.results[0]
        transcript = result.alternatives[0].transcript

        overwrite_chars = " " * (num_chars_printed - len(transcript))

        # 中間結果もファイルに保存
        print(f"Intermediate Transcript: {transcript}")
        write_to_file("Intermediate", transcript + overwrite_chars)

        if result.is_final:
            # 確定した結果が出たときの処理
            print(f"Final Transcript: {transcript}")
            write_to_file("Final", transcript + overwrite_chars)

            # OpenAIにテキストを送信して変換（加工後を表示）
            print("Processing with OpenAI...")
            translated_text = text_transer.get_translation(transcript)
            print(f"Processed: {translated_text}")
            write_to_file("Processed", translated_text)

            num_chars_printed = 0
        else:
            num_chars_printed = len(transcript)

def write_to_file(transcript_type, text):
    """
    transcript_type: 'Original' または 'Processed' としてタイプを指定
    text: 書き込むテキスト
    """
    with open("output.txt", "a", encoding="utf-8") as file:
        file.write(f"{transcript_type}: {text}\n")





def main():
    language_code = "ja-JP"  # 日本語

    client = speech.SpeechClient()
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=RATE,
        language_code=language_code,
    )

    streaming_config = speech.StreamingRecognitionConfig(
        config=config, interim_results=True
    )

    with MicrophoneStream(RATE, CHUNK) as stream:
        audio_generator = stream.generator()
        requests = (speech.StreamingRecognizeRequest(audio_content=content)
                    for content in audio_generator)

        responses = client.streaming_recognize(streaming_config, requests)
        listen_print_loop(responses)

if __name__ == "__main__":
    main()
