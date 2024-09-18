# coding: utf-8
from flask import Flask, request, render_template
from flask_socketio import SocketIO, emit
from microservices.services.transcription.src.main import MicrophoneStream
from microservices.services.transcription.src.test import ResumableMicrophoneStream
from google.cloud import speech
import sys

SAMPLE_RATE = 16000
CHUNK_SIZE = int(SAMPLE_RATE / 10)  # 100ms

# app = Flask(__name__) 
app = Flask(__name__, template_folder='pass') #変更必須 general?
app.config['SECRET_KEY'] = 'secret' 
socketio = SocketIO(app, async_mode=None) 
microphone = MicrophoneStream()


class SiteInfo:
    title = 'ページタイトル'

# 単純なhtmlページのレンダリングとフォームの値の受け取り
@app.route("/", methods=['GET','POST']) # アドレス"/"の時にget_form()を実行しますよ、フォームのget,post両方対応しますよ
def get_form():
    try: # フォームのうち一番最初のname="single"の値をテキストで受け取ります
        # value_single = request.form['single']
        microphone = microphone
    except: # 初回ロード時はフォームを受け取れないので、エラーになる
        value_single = None
    try: # フォームのうちname="list"の値が存在するものをリスト形式で受け取ります
        value_list = request.form.getlist('list')
    except: # 初回ロード時はフォームを受け取れないので、エラーになる
        value_list = []
    return render_template('index.html', # templetes/index.htmlの中身をレンダリングしてページに表示してくれます
                        #    title = SiteInfo.title, # index.html内にて、{{ title }}で挿入できる
                        #    value_list = value_list, # index.html内にて{{ value_list }}で挿入できる
                        #    value_single = value_single, # index.html内にて{{ value_single }}で挿入できる
                           )


###############ウェブソケットを使ったリアルタイム通信#################
# バックグラウンドでサーバー側から常に情報を与える
def background(comment):
    num = 0
    while True:
        socketio.sleep(1) # time.sleepでも代用可能。たぶん
        num += 1
        content = "<span>%d%s</span>" % (num,comment)
        '''my_countに送信。後述の@socketio.on()で指定していないときは、socketio.emitとし、namespaceを指定する必要あり。
        namespaceとmy_countについてはsocket.html内のjQueryで受け取るためのラベルになってます。
        contentが送信するデータです。'''
        socketio.emit('my_count', {'data': content}, namespace='/demo')


# フォームからの入力もリアルタイムに受け取る
@app.route('/websocket',methods=['GET','POST'])
def websocket():
    '''上で作ったgackground(comment)を実行します。whileで続くのにreturnできちゃうのが不思議すぎる。
    この場合、ページに「○秒が経過」と毎秒表示してくれます。'''
    socketio.start_background_task(target=background, comment='秒が経過')
    return render_template('socket.html',
                           async_mode = socketio.async_mode,
                           title = SiteInfo.title,
                           )


@app.route('/mike', method = ['GET','POST'])
def on_mike_clicked():
    
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

    mic_manager = ResumableMicrophoneStream(SAMPLE_RATE, CHUNK_SIZE)
    sys.stdout.write('\nListening, say "終了" to stop.\n\n')
    sys.stdout.write("End (ms)       Transcript Results/Status\n")
    sys.stdout.write("=====================================================\n")

    with mic_manager as stream:
        while not stream.closed:
            audio_generator = stream.generator()
            requests = (
                speech.StreamingRecognizeRequest(audio_content=content)
                for content in audio_generator
            )

            responses = client.streaming_recognize(streaming_config, requests)

            # Now, put the transcription responses to use.
            microphone.listen_print_loop(responses, stream)


# scketioの設定
@socketio.on('receive_content', namespace='/demo') # scket.html側の/demoからreceive_contentに対して送られてきた場合
def send_content(sent_data): # sent_data:受け取ったデータの名前を好きに設定できます。
    content = '<li>%s</li>' % sent_data['data'] # socket.html側で{data:content}としているのでこうなる。
    '''テコ入れしたデータをsocket.htmlのmy_contentに送信。
    broadcast=Trueは同じnamespaceにアクセスしている人全員の画面に反映させちゃいます。
    チャット用とかオンラインゲームの管理人からのメッセージ向けだね。'''
    emit('my_content', {'data': content}, broadcast=False)

if __name__ == "__main__":
    socketio.run(app, host='127.0.0.1', port=5000, debug=True) # debug=Trueはサーバー起動中の修正もすぐに反映されるので、運用時にはFalseにすること
