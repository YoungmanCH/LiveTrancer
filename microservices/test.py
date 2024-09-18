from flask import request, render_template, send_from_directory
from flask import Flask
from flask_socketio import SocketIO, emit
from flask_cors import CORS

app = Flask(__name__, static_folder='static', static_url_path='/')
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app, supports_credentials=True, responses={r"/*": {"origins": "*"}})

@app.route('/')
def index():
    # return send_from_directory('static', 'index.html') # staticフォルダのindex.html
    return render_template('index.html') # templateフォルダのindex.html


@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)


@socketio.on('message', namespace='/demo')
def handle_message(message):
    emit('message', f'{request.sid} => {message}', namespace='/demo', broadcast=True)


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5002, debug=True)

