"use client";

import { useState, useEffect } from "react";
import styles from "./professional.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faRefresh } from "@fortawesome/free-solid-svg-icons";
import io from "socket.io-client";
import { useRouter } from "next/router";

interface ChatMessage {
  sender: string;
  message: string;
}

interface HomeProps {
  isRecording: boolean;
  setIsRecording: (value: boolean) => void;
  isMildTranslation: boolean;
  setIsMildTranslation: (value: boolean) => void;
}

export default function Professional({
  isRecording,
  setIsRecording,
  isMildTranslation,
  setIsMildTranslation,
}: HomeProps) {
  const [inputText, setInputText] = useState("");
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [socket, setSocket] = useState<any>(null);
  const [transcription, setTranscription] = useState<string>("");
  const SOCKET_URL = "http://127.0.0.1:5000"; // FlaskサーバーのURL
  const router = useRouter();
  let mediaRecorder: MediaRecorder;

  useEffect(() => {
    const socketConnection = io(SOCKET_URL);
    setSocket(socketConnection);
    // Socket接続時の確認
    socketConnection.on("connect", () => {
      console.log("Socket connected:", socketConnection.id);
    });

    // サーバーからのSTT結果を受け取る
    socketConnection.on("stt_response", (data) => {
      if (data.text) {
        setTranscription(data.text); // STT結果を表示
        setChatLog((prevLog) => [
          ...prevLog,
          { sender: "AI", message: data.text },
        ]);
      } else if (data.error) {
        console.error("Error:", data.error);
      }
    });

    // WebSocket接続のクリーンアップ
    return () => {
      socketConnection.disconnect();
    };
  }, []);

  // 録音を開始する関数
  const startRecording = async () => {
    if (!socket) return;
    console.log("Recording started");

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      const audioData = event.data;
      socket.emit("stt", audioData);
      console.log("サーバーに音声データを送信中");
    };

    mediaRecorder.start(1000); // Send data every 1 second
    setIsRecording(true);
    console.log("音声データを送信済み");
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      console.log("Recording stopped");
    }
    setIsRecording(false);
  };

  const modeSwitch = () => {
    router.push("/general");
    setIsMildTranslation(!isMildTranslation);
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatBox}>
        {chatLog.length === 0 ? (
          <p className={styles.emptyMessage}>
            インテリジェントな会話を始めましょう！
          </p>
        ) : (
          <div className={styles.chatLog}>
            {chatLog.map((log, index) => (
              <div
                key={index}
                className={
                  log.sender === "User" ? styles.userMessage : styles.aiMessage
                }
              >
                <strong>{log.sender}:</strong> {log.message}
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        className={isRecording ? styles.recordContainer : styles.inputContainer}
      >
        <div className={isRecording ? styles.recordBox : styles.inputBox}>
          <p>{isRecording ? "Recording..." : ""}</p>
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={isRecording ? styles.onRecord : styles.recordButton}
          >
            <FontAwesomeIcon
              icon={faMicrophone}
              className={
                isRecording ? styles.recordingPhone : styles.microphone
              }
            />
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
      </div>
    </div>
  );
}
