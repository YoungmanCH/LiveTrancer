from pathlib import Path
from voicevox_core import VoicevoxCore, METAS
import pyaudio
from io import BytesIO
import wave

print('initialized')

core = VoicevoxCore(open_jtalk_dict_dir=Path("open_jtalk_dic_utf_8-1.11"))

speaker_id = 1 #ずんだもん
text = "こんにちは、今日は遅刻したのだ。森本さん～～～～～～～。はよ飯食わせろ！！。拙者の名前は、とーぎである"

core.load_model(speaker_id)  # 指定したidのモデルを読み込む
wave_bytes = core.tts(text, speaker_id)  # 音声合成を行う


# 生成された音声データ(wave_bytes)を再生する
def play_audio(wave_bytes):
    # BytesIOオブジェクトを使用してメモリ上にwaveファイル形式でデータを格納
    wave_io = BytesIO(wave_bytes)
    wave_obj = wave.open(wave_io, 'rb')

    # PyAudioの初期化
    p = pyaudio.PyAudio()

    # ストリームを開く
    stream = p.open(format=p.get_format_from_width(wave_obj.getsampwidth()),
                    channels=wave_obj.getnchannels(),
                    rate=wave_obj.getframerate(),
                    output=True)

    # データを読み込んで再生
    data = wave_obj.readframes(1024)
    while data:
        stream.write(data)
        data = wave_obj.readframes(1024)

    # ストリームを閉じる
    stream.stop_stream()
    stream.close()

    # PyAudio終了
    p.terminate()
    print('complete audio')

# 生成した音声を再生
play_audio(wave_bytes)