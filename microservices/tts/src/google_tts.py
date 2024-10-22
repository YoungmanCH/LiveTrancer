from dataclasses import dataclass
from google.cloud import texttospeech
from LiveTrancer.microservices.utils import audio_file_saver

@dataclass
class GoogleTTSProps:
    language_code: str
    audio_encoding: list
    ssml_gender: list

class GoogleTTS:
    def __init__(self, props: GoogleTTSProps):
        self.language_code = props.language_code
        self.audio_encoding = props.audio_encoding
        self.ssml_gender = props.ssml_gender
        self._init_config()
        
    def _init_config(self):
        self.client = texttospeech.TextToSpeechClient()
        self.audio_config = texttospeech.AudioConfig(audio_encoding=self.audio_encoding)
        self.voice = texttospeech.VoiceSelectionParams(
          language_code=self.language_code, ssml_gender=self.ssml_gender
        )

    def transcribe_text(self, text):
      try:
          return self._execute_transcribe_text(text)
      except Exception as e:
          print(f"An error occurred during TTS processing: {e}")
    
    def _execute_transcribe_text(self, text):
        input_text = texttospeech.SynthesisInput(text=text)
        response = self._synthesize_speech(input_text)
        tts_audio = self._save_tts_audio(response.audio_content)
        return tts_audio
        
    def _synthesize_speech(self, input_text):
        return self.client.synthesize_speech(input=input_text, voice=self.voice, audio_config=self.audio_config)
        
    def _save_tts_audio(self, audio_data):
        audio_file = audio_file_saver.AudioFileSaver()
        audio_file.save_tts_audio(audio_data)
        