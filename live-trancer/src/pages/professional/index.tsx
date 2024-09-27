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
  let audioContext: AudioContext | null = null;
  let processor: ScriptProcessorNode | null = null;

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
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  const startRecording = async () => {
    if (!socket) return;
    console.log("Recording started");

    // AudioContextとScriptProcessorNodeのセットアップ
    audioContext = new AudioContext();
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const input = audioContext.createMediaStreamSource(stream);

    // ScriptProcessorNodeを作成して、オーディオ処理を行う
    processor = audioContext.createScriptProcessor(1024, 1, 1);
    input.connect(processor);
    processor.connect(audioContext.destination);

    processor.onaudioprocess = (event) => {
      const inputBuffer = event.inputBuffer.getChannelData(0);
      const downsampledBuffer = downsampleBuffer(inputBuffer, audioContext!.sampleRate, 16000);
      console.log('downsampledBuffer: ', downsampledBuffer);
      socket.emit("stt", downsampledBuffer); // 変換した音声データを送信
      console.log("サーバーに音声データを送信中");
    };

    setIsRecording(true);
  };

  const stopRecording = () => {
    if (processor && audioContext) {
      processor.disconnect();
      audioContext.close();
      console.log("Recording stopped");
    }
    setIsRecording(false);
  };

  const downsampleBuffer = (buffer: Float32Array, sampleRate: number, outSampleRate: number) => {
    if (outSampleRate > sampleRate) {
      console.error("ダウンサンプリングレートは、元のサンプルレートより小さくする必要があります。");
      return buffer;
    }
    const sampleRateRatio = sampleRate / outSampleRate;
    const newLength = Math.round(buffer.length / sampleRateRatio);
    const result = new Int16Array(newLength);
    let offsetResult = 0;
    let offsetBuffer = 0;
    while (offsetResult < result.length) {
      const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
      let accum = 0;
      let count = 0;
      for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
        accum += buffer[i];
        count++;
      }
      result[offsetResult] = Math.min(1, accum / count) * 0x7fff;
      offsetResult++;
      offsetBuffer = nextOffsetBuffer;
    }
    console.log('ダウンサンプリング中です');
    return result.buffer;
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
