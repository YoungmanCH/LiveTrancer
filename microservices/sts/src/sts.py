import wave
import numpy as np
import time
from google.cloud import speech, texttospeech
from chatgpt_service.src.text_to_chatgpt import process_text_with_chatgpt

# WAVファイルの設定
SAMPLE_RATE = 16000  # サンプルレート
CHANNELS = 1  # モノラル
SAMPLE_WIDTH = 2  # 16ビット

audio_frames = []
start_time = None
MIN_SILENCE_DURATION = 0.8  # 無音区間のしきい値（秒）
FINISHED_MIN_SILENCE_DURATION = 15

def save_to_wav(audio_data, filename="test_stt_to_wav.wav"):
    """取得した音声データをWAVファイルに保存"""
    with wave.open(filename, 'wb') as wf:
        wf.setnchannels(CHANNELS)
        wf.setsampwidth(SAMPLE_WIDTH)
        wf.setframerate(SAMPLE_RATE)
        wf.writeframes(audio_data)

def transcribe_audio(audio_data):
    """Google STTで音声データをテキストに変換"""
    client = speech.SpeechClient()
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=SAMPLE_RATE,
        language_code="ja-JP",
        enable_automatic_punctuation=True
    )
    response = client.recognize(config=config, audio=speech.RecognitionAudio(content=audio_data))
    if response.results:
        transcript = response.results[0].alternatives[0].transcript
        print(f'Transcript: {transcript}')
        save_original_transcription_to_file(transcript)

        # ChatGPTでテキストを加工し、TTSで音声化
        processed_text = process_text_with_chatgpt(transcript)
        save_transcription_to_file(processed_text)
        synthesize_speech(processed_text)  # TTSで音声を生成
    else:
        print("STTの解析結果がありません。")

# 音声はvoicevoxではなく、google ttsのデフォルト音声を使用
def synthesize_speech(text):
    """TTSで加工済みテキストを音声に変換し保存"""
    print('ttsを実行中')
    client = texttospeech.TextToSpeechClient()
    input_text = texttospeech.SynthesisInput(text=text)
    voice = texttospeech.VoiceSelectionParams(
        language_code="ja-JP", ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL
    )
    audio_config = texttospeech.AudioConfig(audio_encoding=texttospeech.AudioEncoding.LINEAR16)

    response = client.synthesize_speech(input=input_text, voice=voice, audio_config=audio_config)
    output_filename = "output_audio.wav"
    with open(output_filename, "wb") as out:
        out.write(response.audio_content)
    print(f"音声ファイル {output_filename} が生成されました。")

def save_original_transcription_to_file(transcript):
    """元のテキストを保存"""
    with open("original_transcription.txt", "a", encoding="utf-8") as f:
        f.write(transcript + "\n")

def save_transcription_to_file(transcript):
    """加工済みテキストを保存"""
    with open("transcription.txt", "a", encoding="utf-8") as f:
        f.write(transcript + "\n")

def process_audio(data):
    """無音区間ごとに音声を区切り、STTで解析する"""
    print('stsを実行中')
    global start_time, audio_frames

    silence_threshold = 1000

    def is_silence(audio_chunk):
        """無音区間の判定"""
        return max(audio_chunk) < silence_threshold

    audio_frames.append(data)

    if start_time is None:
        start_time = time.time()

    if is_silence(data):
        if time.time() - start_time >= MIN_SILENCE_DURATION:
            combined_data = np.concatenate(audio_frames).tobytes()
            transcribe_audio(combined_data)
            audio_frames = []
            start_time = None
        elif time.time() - start_time >= FINISHED_MIN_SILENCE_DURATION:
          combined_data = np.concatenate(audio_frames).tobytes()
          save_to_wav(combined_data)
    else:
        print("音声データを蓄積中...")

