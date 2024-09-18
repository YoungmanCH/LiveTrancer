'use client';

import { useState, useEffect } from 'react';
import styles from './general.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faMicrophoneAltSlash, faMicrophoneSlash, faRefresh } from "@fortawesome/free-solid-svg-icons";
import io from "socket.io-client";
import { useRouter } from 'next/router';

interface ChatMessage {
  sender: string;
  message: string;
}

interface GeneralProps {
  isRecording: boolean;
  setIsRecording: (value: boolean) => void;
  isMildTranslation: boolean;
  setIsMildTranslation: (value: boolean) => void;
}

export default function General({
  isRecording, 
  setIsRecording,
  isMildTranslation,
  setIsMildTranslation
}: GeneralProps) {
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
    }
    setIsRecording(!isRecording);
  };
  /*transcription/index.tsxからコピー ここまで*/


  const handleSend = () => {
    if (inputText.trim()) {
      setChatLog((prevLog) => [
        ...prevLog,
        { sender: 'User', message: inputText },
        { sender: 'AI', message: `This is a response to: "${inputText}"` },
      ]);
      setInputText('');
    }
  };

  const modeSwitch = () => {
    router.push('/professional');
    setIsMildTranslation(!isMildTranslation);
  };
  let message;
  if(isRecording) {
    message = <p>Recording...</p>;
  }else{
    message = null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.chatBox}>
        {chatLog.length === 0 ? (
          <p className={styles.emptyMessage}>楽しいトークを始めましょう！</p>
        ) : (
          <div className={styles.chatLog}>
            {chatLog.map((log, index) => (
              <div key={index} className={log.sender === 'User' ? styles.userMessage : styles.aiMessage}>
                <strong>{log.sender}:</strong> {log.message}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={isRecording ? styles.recordContainer : styles.inputContainer}>
        <div className={isRecording ? styles.recordBox : styles.inputBox}>
          <div>
            {message}
          </div>
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={isRecording ? styles.onRecord : styles.recordButton}
          >
            <FontAwesomeIcon 
              icon={faMicrophone} 
              className={isRecording ? styles.recordingPhone : styles.microphone}
            /> {/* アイコン切り替え */}
          </button>
          <button
            onClick={modeSwitch}
            className={isRecording ? styles.none : styles.modeSwitch}
          >
            <FontAwesomeIcon
              icon={faRefresh}
              className={styles.modeSwitchIcon}
            />
          </button>
        </div>
        {/* <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Send a message..."
          className={styles.textArea}
        />
        <button onClick={handleSend} className={styles.sendButton}>Send</button> */}
      </div>
    </div>
  );
}
