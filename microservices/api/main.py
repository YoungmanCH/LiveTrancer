import numpy as np
from flask import Flask
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from LiveTrancer.microservices.utils import save_audio
from LiveTrancer.microservices.stt.src import stt
from LiveTrancer.microservices.stt.src import stt_to_chatgpt
from LiveTrancer.microservices.tts.src import tts
from LiveTrancer.microservices.sts.src import sts
from LiveTrancer.microservices.sts.src import stt_to_chatgpt_to_tts

app = Flask(__name__)
CORS(app)  # CORSを全オリジンに対して許可
socketio = SocketIO(app, async_mode='eventlet', cors_allowed_origins="*")

# WebSocket接続時の処理
@socketio.on('connect')
def handle_connect():
    print("クライアントが接続されました")
    emit('response', {'message': 'WebSocketに接続しました'})

@socketio.on('stt')
def handle_stt(audio_data):
    try:
        print("音声データを受信しました")
        data = np.frombuffer(audio_data, dtype=np.int16)

        save_audio.save_audio(data)
        audio_processor = sts.STSAudioProcessor.get_instance()
        # audio_processor = stt_to_chatgpt.STTToChatGPTAudioProcessor.get_instance()
        # audio_processor = stt.STTAudioProcessor.get_instance()
        tts_data = audio_processor.process_audio(data)

    except Exception as e:
        emit('stt_response', {'error': str(e)})

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
    socketio.run(app, debug=True, host='0.0.0.0', port=5003)
