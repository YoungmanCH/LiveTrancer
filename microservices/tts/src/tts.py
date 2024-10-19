from LiveTrancer.microservices.tts.src import google_tts
from google.cloud import texttospeech
    
class TTSProcessor:
    def transcribe_text_with_google_tts(self, text):
        language_code = "ja-JP"
        audio_encoding = texttospeech.AudioEncoding.LINEAR16
        ssml_gender = texttospeech.SsmlVoiceGender.NEUTRAL
        google_tts_props = google_tts.GoogleTTSProps(language_code=language_code, audio_encoding=audio_encoding, ssml_gender=ssml_gender)
        googleTTS = google_tts.GoogleTTS(google_tts_props)
            
        return googleTTS.transcribe_text(text)
    