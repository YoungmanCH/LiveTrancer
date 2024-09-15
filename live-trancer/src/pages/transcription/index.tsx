import React, { useEffect, useState } from "react";
import io from "socket.io-client";

// サーバー側のエンドポイント
const SOCKET_URL = '../../../../microservices/services/transcription/src/index.ts';
// const SOCKET_URL = 'http://localhost:3001';
let mediaRecorder: MediaRecorder;

const TranscriptionPage = () => {
  const [socket, setSocket] = useState<any>(null);
  const [transcription, setTranscription] = useState<string>("");
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    // Socket.IOに接続
    const socketConnection = io(SOCKET_URL);
    setSocket(socketConnection);

    // Socket接続時の確認
    socketConnection.on("connect", () => {
      console.log("Socket connected:", socketConnection.id);
    });

    // エラーが発生した場合
    socketConnection.on("error", (error) => {
      console.error("Socket error:", error);
    });

    // 接続が切断された場合
    socketConnection.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    // サーバーからのテキストを受け取る
    socketConnection.on("transcription", (data: string) => {
      setTranscription(data);
    });

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  // 録音を開始する関数
  const startRecording = async () => {
    if (!socket) return;

    console.log('started');

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      const audioData = event.data; // 音声データ
      // console.log('Sending audio data:', audioData);
      socket.emit('audio-stream', audioData); // サーバーに音声データを送信
    };

    mediaRecorder.start(2000); // 2秒ごとにデータを送信(0.1秒だとAPIの呼び出し制限に引っかかる)
    setIsRecording(true);
  };

  // 録音を停止する関数
  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      console.log('stopped');
    }
  };

  return (
    <div>
      <h1>Live Transcription</h1>
      <button onClick={startRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
      <div>
        <h2>Transcription:</h2>
        <p>{transcription}</p>
      </div>
    </div>
  );
};

export default TranscriptionPage;
