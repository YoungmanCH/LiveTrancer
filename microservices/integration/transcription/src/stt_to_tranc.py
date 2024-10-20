import wave
import numpy as np
import time
from google.cloud import speech
from process_text_with_chatgpt import process_text_with_chatgpt

# WAVファイルの設定
SAMPLE_RATE = 16000  # サンプルレート
CHANNELS = 1  # モノラル
SAMPLE_WIDTH = 2  # 16ビット

# 音声データを蓄積するリストと時間管理
audio_frames = []
start_time = None  # 音声収集の開始時間
MIN_SILENCE_DURATION = 0.8  # 文節を区切るための無音区間のしきい値（秒）

# 直近の音声域〜無音声域までの音声を同ファイルに上書き保存。
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
                transcript = result.alternatives[0].transcript
                print(f'Transcript: {transcript}')

                # 元のテキストをファイルに保存
                save_original_transcription_to_file(transcript)
                
                # テキストをChatGPTで加工してファイルに保存
                processed_text = process_text_with_chatgpt(transcript)
                save_transcription_to_file(processed_text)
                
    except Exception as e:
        print(f"An error occurred during STT processing: {e}")


def save_original_transcription_to_file(transcript):
    """STTで取得した元のテキストを別のファイルに保存"""
    with open("original_transcription.txt", "a", encoding="utf-8") as f:
        f.write(transcript + "\n")
    print("Original transcription saved to original_transcription.txt")

def save_transcription_to_file(transcript):
    """STTで取得したテキストをファイルに保存"""
    with open("transcription.txt", "a", encoding="utf-8") as f:
        f.write(transcript + "\n")
    print("Transcription saved to transcription.txt")

def process_audio(data):
    """
    音声データを蓄積し、無音区間ごとに文節を判断してGoogle STTで解析する。
    文節の処理が終了した後にChatGPTでテキスト加工を施し、ファイルに保存する。
    """
    global start_time, audio_frames

    # 無音区間を検出するしきい値
    # 音質によって適切に調整しよう！
    silence_threshold = 1000  # 例として音声の振幅をしきい値として使う

    def is_silence(audio_chunk):
        """無音区間を検出する簡単な関数"""
        return max(audio_chunk) < silence_threshold

    # 音声データを追加
    audio_frames.append(data)

    # 音声収集の開始時間を設定
    if start_time is None:
        start_time = time.time()

    # 無音区間が検出された場合に文節を区切る
    if is_silence(data):
        print("無音区間が検出されました。文節を処理します。")

        # 音声データをリセットせず、無音区間終了後に処理
        if time.time() - start_time >= MIN_SILENCE_DURATION:
            # 蓄積した音声データを結合してWAVファイルに保存
            combined_data = np.concatenate(audio_frames).tobytes()
            save_to_wav(combined_data)
            print("Audio data saved to test_stt_to_wav.wav")

            # Google STTで音声データを解析
            transcribe_audio(combined_data)

            # 音声データと開始時間をリセット
            audio_frames = []
            start_time = None

    else:
        # 無音区間でなければ音声を継続的に蓄積する
        print("音声データを継続して蓄積中...")

