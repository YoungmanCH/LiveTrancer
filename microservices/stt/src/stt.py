import numpy as np
import time
from LiveTrancer.microservices.stt.src import google_stt
from LiveTrancer.microservices.utils import audio_file_saver

class STTAudioProcessor:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(STTAudioProcessor, cls).__new__(cls, *args, **kwargs)
        return cls._instance
    
    @classmethod
    def get_instance(cls):
        if not cls._instance:
            cls._instance = cls()
        return cls._instance
    
    def __init__(self):
        self.audio_frames = []
        self.audio_segment_start_time = None
        self.min_silence_duration = 0.8 # 文節を区切るための無音区間のしきい値（秒）
        self.silence_threshold = 1000 # 無音区間を検出するしきい値
        
    def process_audio(self, data):
        self._append_audio_frames(data)
            
        if self.audio_segment_start_time is None:
            self._set_audio_segment_start_time()
        
        if self._is_silence(data):
            if self.audio_segment_start_time is None:
                return
                        
            if time.time() - self.audio_segment_start_time >= self.min_silence_duration:
                print("無音区間が検出されました。文節を処理します。")
                self._handle_audio_transcription()
            
        else:
            print("音声データを継続して蓄積中...")
    
    def _append_audio_frames(self, data):
        self.audio_frames.append(data)
        
    def _set_audio_segment_start_time(self):
        self.audio_segment_start_time = time.time()
        
    def _is_silence(self, audio_chunk):
        return max(audio_chunk) < self.silence_threshold
    
    def _handle_audio_transcription(self):
        combined_audio_data = self._combined_audio()
        responses = self._transcribe_audio_with_google_stt(combined_audio_data)
        self._process_audio_with_stt_and_chatgpt(responses)
        self._reset_frames_and_audio_segment_start_time()
        
    def _combined_audio(self) -> bytes: 
        return np.concatenate(self.audio_frames).tobytes()
    
    def _transcribe_audio_with_google_stt(self, audio_data: bytes):
        sample_rate = 16000
        language_code = "ja-JP"
        enable_automatic_punctuation = True
        googleSTTProps = google_stt.GoogleSTTProps(sample_rate=sample_rate, language_code=language_code, enable_automatic_punctuation=enable_automatic_punctuation)
        googleSTT = google_stt.GoogleSTT(googleSTTProps)
        
        return googleSTT.transcribe_audio(audio_data)
        
    def _process_audio_with_stt_and_chatgpt(self, responses):
        for response in responses:
            for result in response.results:
                transcript = result.alternatives[0].transcript
                print(f'STT結果: {transcript}')
                
                self._save_original_transcription_to_file(transcript)
        
    def _reset_frames_and_audio_segment_start_time(self):
        self.audio_frames = []
        self.audio_segment_start_time = None
        
    def _save_original_transcription_to_file(self, transcript):
        audio_file = audio_file_saver.AudioFileSaver()
        audio_file.save_original_transcription_to_file(transcript)
