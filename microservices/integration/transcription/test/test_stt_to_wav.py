import wave
import numpy as np
import time

# WAVファイルの設定
SAMPLE_RATE = 16000  # サンプルレート
CHANNELS = 1  # モノラル
SAMPLE_WIDTH = 2  # 16ビット
DURATION = 10  # 10秒間音声を収集

# 音声データを蓄積するリストと時間管理
audio_frames = []
start_time = None  # 音声収集の開始時間

def save_to_wav(audio_data, filename="test_stt_to_wav.wav"):
    """取得した音声データをWAVファイルに保存"""
    with wave.open(filename, 'wb') as wf:
        wf.setnchannels(CHANNELS)
        wf.setsampwidth(SAMPLE_WIDTH)
        wf.setframerate(SAMPLE_RATE)
        wf.writeframes(audio_data)

def process_audio(data):
    """
    音声データを蓄積し、10秒間のデータが収集されたらWAVファイルに保存する。
    """
    global start_time, audio_frames

    audio_frames.append(data)

    # 音声収集の開始時間を設定
    if start_time is None:
        start_time = time.time()

    # 10秒間の音声が蓄積された場合
    if time.time() - start_time >= DURATION:
        # 蓄積した音声データを結合してWAVファイルに保存
        combined_data = np.concatenate(audio_frames).tobytes()
        save_to_wav(combined_data)
        print("Audio data saved to test_stt_to_wav.wav")

        # 音声データと開始時間をリセット
        audio_frames = []
        start_time = None
