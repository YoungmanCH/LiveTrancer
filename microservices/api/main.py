from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS  # 追加
import subprocess
import sys
from ..integration.transcription.src.stt_to_tranc import main

app = Flask(__name__)
CORS(app)  # CORSの適用 (全てのオリジンを許可)
socketio = SocketIO(app, async_mode='eventlet', cors_allowed_origins="http://localhost:3000")

# WebSocket接続時に実行される
@socketio.on('connect')
def handle_connect():
    print("Client connected")
    emit('response', {'message': 'Connected to WebSocket'})

# WebSocket通信でsttリクエストを受け取る
@socketio.on('stt')
def handle_stt(data):
    try:
        # STT処理の開始
        text = main()  # STT結果を取得するために変更が必要な場合
        emit('stt_response', {'text': text})
    except Exception as e:
        emit('stt_response', {'error': str(e)})

# WebSocket通信でttsリクエストを受け取る
@socketio.on('tts')
def handle_tts(data):
    try:
        # TTS処理を行う（data['text']に基づいてTTSを行う）
        text = data['text']
        # TTSの実行処理（ここにTTS処理の関数を追加）
        emit('tts_response', {'audio': 'audio_data_placeholder'})  # 実際の音声データを返す
    except Exception as e:
        emit('tts_response', {'error': str(e)})

# エラー時の処理
@socketio.on_error()
def error_handler(e):
    print(f'Error: {e}')

if __name__ == '__main__':
    socketio.run(app, debug=True)
