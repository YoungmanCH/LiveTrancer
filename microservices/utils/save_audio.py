import wave
import numpy as np
import time
from LiveTrancer.microservices.utils import audio_file_saver

audio_frames = []
start_time = None
auto_save_duration = 10 # 一定秒数録音後後に自動保存する閾値（秒）

def save_audio(data):
    """
    音声データを蓄積し、一定時間の音声データが収集されたらWAVファイルに保存する。
    """
    global start_time, audio_frames

    audio_frames.append(data)

    if start_time is None:
        start_time = time.time()

    if time.time() - start_time >= auto_save_duration:
        combined_data = np.concatenate(audio_frames).tobytes()
        audio_file = audio_file_saver.AudioFileSaver()
        audio_file.save_original_audio(combined_data)

        # 音声データと開始時間をリセット
        audio_frames = []
        start_time = None
