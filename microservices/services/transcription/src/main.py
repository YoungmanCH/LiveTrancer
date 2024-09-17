import threading
import time
from google.cloud import speech
from pydub import AudioSegment
from pydub.playback import play
from vad import google_vad
from stt import google_stt  # STTからMicrophoneStreamをインポート
from llm import chatgpt      # OpenAI-based LLM (Language Model) module

import textTrancer_OpenAI
# OpenAIのテキスト変換クラスを初期化
text_transer = textTrancer_OpenAI.Text_Transer_OpenAI()

from tts import voicevox
from voicevox_core import VoicevoxCore

class LiveTrancerMain:
    def __init__(self):
        self.valid_stream = True
        self.latest_user_utterance = None
        self.time_user_speeching_end = None

        # Initialize Google VAD
        vad = google_vad.GOOGLE_WEBRTC()
        vad_thread = threading.Thread(target=vad.vad_loop, args=(self.callback_vad,))
        vad_thread.start()

        # Initialize Google STT
        stt_thread = threading.Thread(target=self.stt_transcription)
        stt_thread.start()

        # Initialize LLM
        self.llm = text_transer.Text_Transer_OpenAI()

    def stt_transcription(self):
        client = speech.SpeechClient()
        config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
            sample_rate_hertz=16000,
            language_code="ja-JP",
        )
        streaming_config = speech.StreamingRecognitionConfig(
            config=config, interim_results=True
        )

        # Use STT's MicrophoneStream instead of google_vad
        with google_stt.MicrophoneStream(16000, int(16000 / 10)) as stream:
            audio_generator = stream.generator()
            requests = (speech.StreamingRecognizeRequest(audio_content=content)
                        for content in audio_generator)

            responses = client.streaming_recognize(streaming_config, requests)
            self.listen_loop(responses)

    def listen_loop(self, responses):
        for response in responses:
            if not response.results:
                continue
            result = response.results[0]
            if result.is_final:
                self.latest_user_utterance = result.alternatives[0].transcript
                print(f"Final transcription: {self.latest_user_utterance}")
            else:
                print(f"Interim transcription: {result.alternatives[0].transcript}")

    def callback_vad(self, is_speaking):
        print(f"VAD detected: {'speaking' if is_speaking else 'silence'}")
        if not is_speaking and self.latest_user_utterance:
            self.time_user_speeching_end = time.time()
            threading.Thread(target=self.process_transcription).start()

    def process_transcription(self):
        if self.latest_user_utterance:
            transformed_text = self.llm.get_translation_stream(self.latest_user_utterance)
            print(f"Transformed Text: {transformed_text}")
            wav_data, wav_length = voicevox.get_audio_file_from_text(transformed_text)
            self.audio_play(wav_data, wav_length)

    def audio_play(self, wav_data, wav_length):
        start_time = time.time()
        audio_file_path = "response.wav"
        with open(audio_file_path, "wb") as f:
            f.write(wav_data)
        if self.time_user_speeching_end:
            print(f"Response time: {time.time() - self.time_user_speeching_end} seconds")
        sound = AudioSegment.from_wav(audio_file_path)
        play(sound)
        while time.time() - start_time < wav_length:
            pass

    def wait(self):
        thread_list = threading.enumerate()
        thread_list.remove(threading.main_thread())
        for thread in thread_list:
            thread.join()

if __name__ == '__main__':
    live_trancer = LiveTrancerMain()
    live_trancer.wait()
