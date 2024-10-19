from dataclasses import dataclass
from google.cloud import speech
from LiveTrancer.microservices.utils import audio_file_saver

@dataclass
class GoogleSTTProps:
    sample_rate: int
    language_code: str
    enable_automatic_punctuation: bool

class GoogleSTT:
    def __init__(self, props: GoogleSTTProps):
        self.sample_rate = props.sample_rate
        self.language_code = props.language_code
        self.enable_automatic_punctuation = props.enable_automatic_punctuation
        self._init_config()
        
    def _init_config(self):
        self.client = speech.SpeechClient()
        self.config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
            sample_rate_hertz=self.sample_rate,
            language_code=self.language_code,
            enable_automatic_punctuation=self.enable_automatic_punctuation
        )
        self.streaming_config = speech.StreamingRecognitionConfig(
            config=self.config, interim_results=False
        )
        
    def transcribe_audio(self, audio_data):
        try:
            self._execute_transcribe_audio(audio_data)
        except Exception as e:
             print(f"An error occurred during STT processing: {e}")
    
    def _execute_transcribe_audio(self, audio_data):
        requests = self._create_request(audio_data)
        responses = self._streaming_recognize(requests)
            
        for response in responses:
            for result in response.results:
                transcript = result.alternatives[0].transcript
                print(f'STT結果: {transcript}')
                    
                self._save_original_transcription_to_file(transcript)
    
    def _create_request(self, audio_data)-> list:
        return [speech.StreamingRecognizeRequest(audio_content=audio_data)]
    
    def _streaming_recognize(self, requests):
        return self.client.streaming_recognize(self.streaming_config, iter(requests))
    
    def _save_original_transcription_to_file(self, transcript):
        audioFileSaver = audio_file_saver.AudioFileSaver()
        audioFileSaver.save_original_transcription_to_file(transcript)
        