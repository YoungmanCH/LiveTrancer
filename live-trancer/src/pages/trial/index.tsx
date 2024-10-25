import { useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faRefresh } from "@fortawesome/free-solid-svg-icons";
import styles from "./trial.module.css";
import { RecordingProcessor } from "../../services/recordingProcessor";
import { ChatMessageProps } from "../../types/type";
import { switchMode } from "../utils/utils";
import { useSocketHandler } from "../../hooks/useSocketHandler";

interface HomeProps {
  isRecording: boolean;
  setIsRecording: (value: boolean) => void;
  isMildTranslation: boolean;
  setIsMildTranslation: (value: boolean) => void;
}

export default function Trial({
  isRecording,
  setIsRecording,
  isMildTranslation,
  setIsMildTranslation,
}: HomeProps) {
  const [chatLog, setChatLog] = useState<ChatMessageProps[]>([]);
  const [socket, setSocket] = useState<any>(null);
  const [transcription, setTranscription] = useState<string>("");
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [processor, setProcessor] = useState<ScriptProcessorNode | null>(null);
  const router = useRouter();
  const recordingProcessor = new RecordingProcessor();
  const SOCKET_URL = "http://127.0.0.1:5003";

  useSocketHandler({
    SOCKET_URL,
    setSocket,
    setTranscription,
    setChatLog,
    audioContext,
  });

  const _handleSwitchMode = () => {
    switchMode({ router, isMildTranslation, setIsMildTranslation });
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatBox}>
        {chatLog.length === 0 ? (
          <p className={styles.emptyMessage}>
            リアルタイムで新しい音声に ! 新しい会話体験を手軽に試してみましょう。（1日5回までお試し可）
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
                <strong>{log.sender}:</strong> {log.message ?? ""}
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
            onClick={() =>
              isRecording
                ? recordingProcessor.stopRecording({
                    socket: socket,
                    audioContext: audioContext,
                    processor: processor,
                    setIsRecording: setIsRecording,
                  })
                : recordingProcessor.startRecording({
                    setIsRecording: setIsRecording,
                    socket: socket,
                    setAudioContext: setAudioContext,
                    setProcessor: setProcessor,
                  })
            }
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
            onClick={_handleSwitchMode}
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
