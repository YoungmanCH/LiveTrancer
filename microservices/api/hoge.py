import numpy as np

from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from integration.transcription.src import stt_to_tranc  # STT処理用のモジュールをインポート
from integration.transcription.src import test_stt_to_wav

print('hello')
app = Flask(__name__)
CORS(app)  # CORSを全オリジンに対して許可
socketio = SocketIO(app, async_mode='eventlet', cors_allowed_origins="*")

# WebSocket接続時の処理
@socketio.on('connect')
def handle_connect():
    print("クライアントが接続されました")
    emit('response', {'message': 'WebSocketに接続しました'})
        
# # WebSocketでSTTリクエストを受信
@socketio.on('stt')
def handle_stt(audio_data):
    try:
        # audio_dataを受信し、STT処理を行う
        print("音声データを受信しました")
        data = np.frombuffer(audio_data, dtype=np.int16)
        print(f"Audio data type: {data.dtype}")
        text = stt_to_tranc.main(data)  # `main()`をaudio_dataを受け取る形式に変更
        emit('stt_response', {'text': text})
        print(f'解析したテキスト {text}')
    except Exception as e:
        emit('stt_response', {'error': str(e)})

# WebSocketでTTSリクエストを受信
@socketio.on('tts')
def handle_tts(data):
    try:
        # TTS処理（例: data['text']の内容を音声化）
        text = data['text']
        # TTS処理をここに追加
        emit('tts_response', {'audio': 'audio_data_placeholder'})  # 実際の音声データに置き換え
    except Exception as e:
        emit('tts_response', {'error': str(e)})

# エラーハンドリング
@socketio.on_error()
def error_handler(e):
    print(f'エラー: {e}')

if __name__ == '__main__':
    socketio.run(app, debug=True)
