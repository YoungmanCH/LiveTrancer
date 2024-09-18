'use client';

import { useState, useEffect } from 'react';
import styles from './dashboard.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import io from "socket.io-client";
import { useRouter } from 'next/router';

interface DashboardProps {
    isChoosen: boolean;
    setIsChoosen: (value: boolean) => void;
    isMildTranslation: boolean;
    setIsMildTranslation: (value: boolean) => void;
}

export default function dashboard({
    isChoosen,
    setIsChoosen,
    isMildTranslation,
    setIsMildTranslation
}: DashboardProps) {
<<<<<<< HEAD
    const router = useRouter();
    const GeneralChoosen = () => {
        setIsChoosen(true);
        setIsMildTranslation(true);
        router.push('/general');
=======
  const [inputText, setInputText] = useState('');
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
 
  /*transcription/index.tsxからコピー*/
  const [socket, setSocket] = useState<any>(null);
  const [transcription, setTranscription] = useState<string>("");
  const SOCKET_URL = '../../../../microservices/services/transcription/src/index.ts';
  const router = useRouter();

  let mediaRecorder: MediaRecorder;
  
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
    setIsRecording(!isRecording);
  };

  // 録音を停止する関数
  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      console.log('stopped');
>>>>>>> main
    }
    const ProfessionalChoosen = () => {
        setIsChoosen(true);
        setIsMildTranslation(false);
        router.push('/professional');
    }
    return (
        <div className={styles.container}>
            <p className={styles.title}>モードを選択</p>
            <div className={styles.buttonContainer}>
                <button className={styles.generalButton} onClick={GeneralChoosen}>
                    General
                </button>
                <button className={styles.professionalButton} onClick={ProfessionalChoosen}>
                    Professional
                </button>
            </div>
        </div>
<<<<<<< HEAD
    );
}
=======
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Send a message..."
          className={styles.textArea}
        />
        <button onClick={handleSend} className={styles.sendButton}>Send</button>
      </div>
    </div>
  );
}
>>>>>>> main
