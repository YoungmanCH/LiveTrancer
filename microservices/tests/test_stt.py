import wave
import numpy as np
import time
from google.cloud import speech

# WAVファイルの設定
SAMPLE_RATE = 16000  # サンプルレート
CHANNELS = 1  # モノラル
SAMPLE_WIDTH = 2  # 16ビット

# 音声データを蓄積するリストと時間管理
audio_frames = []
start_time = None  # 音声収集の開始時間
silence_start_time = None  # 無音区間の開始時間を記録
MIN_SILENCE_DURATION = 0.8  # 文節を区切るための無音区間のしきい値（秒）

def save_to_wav(audio_data, filename="test_stt_to_wav.wav"):
    """取得した音声データをWAVファイルに保存"""
    with wave.open(filename, 'wb') as wf:
        wf.setnchannels(CHANNELS)
        wf.setsampwidth(SAMPLE_WIDTH)
        wf.setframerate(SAMPLE_RATE)
        wf.writeframes(audio_data)

def transcribe_audio(audio_data):
    """Google STTを使用して音声データをテキストに変換"""
    client = speech.SpeechClient()
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=SAMPLE_RATE,
        language_code="ja-JP",
        enable_automatic_punctuation=True  # 句読点の自動挿入を有効化
    )
    streaming_config = speech.StreamingRecognitionConfig(
        config=config, interim_results=False
    )

    # Google STT用のリクエストを生成
    requests = [speech.StreamingRecognizeRequest(audio_content=audio_data)]

    try:
        # Google STTへのストリーミングリクエスト
        responses = client.streaming_recognize(streaming_config, iter(requests))
        print("STTによる音声解析結果:")

        # レスポンスからのテキスト解析と出力
        for response in responses:
            for result in response.results:
                print(f'Transcript: {result.alternatives[0].transcript}')
                # ここでテキストを他の処理に渡すことも可能
                save_transcription_to_file(result.alternatives[0].transcript)
    except Exception as e:
        print(f"An error occurred during STT processing: {e}")

def save_transcription_to_file(transcript):
    """STTで取得したテキストをファイルに保存"""
    with open("transcription.txt", "a", encoding="utf-8") as f:
        f.write(transcript + "\n")
    print("Transcription saved to transcription.txt")

def process_audio(data):
    """
    音声データを蓄積し、無音区間ごとに文節を判断してGoogle STTで解析する。
    文節の処理が終了した後にWAVファイルに音声データを保存する。
    """
    global start_time, audio_frames, silence_start_time

    # 無音区間を検出するしきい値
    # 音質によって適切に調整しよう！
    silence_threshold = 1000  # 音声の振幅を無音区間のしきい値として使用

    def is_silence(audio_chunk):
        """無音区間を検出する簡単な関数"""
        return max(audio_chunk) < silence_threshold

    # 音声データを追加
    audio_frames.append(data)

    # 音声収集の開始時間を設定
    if start_time is None:
        start_time = time.time()

    if is_silence(data):
        # 無音区間の開始時刻を設定
        if silence_start_time is None:
            silence_start_time = time.time()
        # 無音が一定時間続いた場合、文節として処理
        elif time.time() - silence_start_time >= MIN_SILENCE_DURATION:
            print("無音区間が続いています。文節を処理します。")
            
            # 蓄積した音声データを結合してWAVファイルに保存
            combined_data = np.concatenate(audio_frames).tobytes()
            save_to_wav(combined_data)
            print("Audio data saved to test_stt_to_wav.wav")

            # Google STTで音声データを解析
            transcribe_audio(combined_data)

            # 音声データと開始時間をリセット
            audio_frames = []
            start_time = None
            silence_start_time = None
    else:
        # 無音でない場合、無音区間のカウントをリセット
        silence_start_time = None
        print("音声データを継続して蓄積中...")
