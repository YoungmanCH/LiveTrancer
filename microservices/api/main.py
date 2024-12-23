import numpy as np
import io
from flask import Flask, request
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from ..utils import save_audio, write_binary
from ..stt.src import stt
from ..stt.src import stt_to_chatgpt
from ..tts.src import tts
from ..sts.src import sts
from ..sts.src import stt_to_chatgpt_to_tts
from ..ip_limiter.src.ip_handler import IPAddressFetcher, IPLimitProcessor

AUDIO_BUFFER = io.BytesIO() 

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, async_mode='eventlet', cors_allowed_origins="*")

@socketio.on('connect')
def handle_connect():
    print("クライアントが接続されました")

@socketio.on('sts')
def handle_sts(audio_data):
    global AUDIO_BUFFER
    try:
        print("音声データを受信しました")
        data = np.frombuffer(audio_data, dtype=np.int16)

        save_audio.save_audio(data)
        
        audio_processor = stt_to_chatgpt_to_tts.STTToChatGPTToTTSAudioProcessor.get_instance()
        tts_audio = audio_processor.process_audio(data)
        write_binary(AUDIO_BUFFER, tts_audio)
        
        audio_processor = stt_to_chatgpt.STTToChatGPTAudioProcessor.get_instance()
        audio_processor.process_audio(data)

    except Exception as e:
        emit('sts_response', {'error': str(e)})
        
@socketio.on('stop_recording')
def handle_stop_recording():
    global AUDIO_BUFFER
    try:
        if AUDIO_BUFFER.tell() > 0:
            print('TTS音声データが送信されました。')
            AUDIO_BUFFER.seek(0)
            emit('stop_recording', AUDIO_BUFFER.read(), binary=True)
            AUDIO_BUFFER = io.BytesIO()
    except Exception as e:
        emit('stop_recording', {'error': str(e)})

@socketio.on('query_db')
def handle_query_db():
    print('クエリが実行されました')
    ip_address = IPAddressFetcher.fetch_from_request(request)
    ipLimiter = IPLimitProcessor()
    
    if not ipLimiter.check_ip_limit(ip_address):
        emit('query_db_response', {'error': '1日のリクエスト上限に達しました'}, room=request.sid)
        print('1日のリクエスト上限に達しました')
    else:
        emit('query_db_response', {'count': '本日の残り回数'}, room=request.sid)
        
# @socketio.on('query_db')
# def unlimited_handle_query_db():
#     print('クエリが実行されました')
#     IPAddressFetcher.fetch_from_request(request)
#     emit('query_db_response', {'count': '本日の残り回数'}, room=request.sid)

if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0', port=5003)
    
# @socketio.on_error()
# def error_handler(e):
#     print(f'エラー: {e}')