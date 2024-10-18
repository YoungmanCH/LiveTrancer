import wave
import numpy as np
import time
from google.cloud import speech

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

def transcribe_audio(audio_data):
    """Google STTを使用して音声データをテキストに変換し、結果をテキストファイルに保存"""
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

    # Google STT用のリクエストを生成
    requests = [speech.StreamingRecognizeRequest(audio_content=audio_data)]

    try:
        # Google STTへのストリーミングリクエスト
        responses = client.streaming_recognize(streaming_config, iter(requests))
        print("STTによる音声解析結果をファイルに書き出します。")

        # 結果をテキストファイルに書き出し
        with open("transcription_result.txt", "w", encoding="utf-8") as file:
            for response in responses:
                for result in response.results:
                    transcript = result.alternatives[0].transcript
                    print(f'Transcript: {transcript}')  # デバッグ用にコンソールにも出力
                    file.write(transcript + "\n")

    except Exception as e:
        print(f"An error occurred during STT processing: {e}")

def process_audio(data):
    """
    音声データを蓄積し、10秒間のデータが収集されたらGoogle STTで解析する。
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

        # Google STTで音声データを解析し、結果をファイルに保存
        transcribe_audio(combined_data)

        # 音声データと開始時間をリセット
        audio_frames = []
        start_time = None
