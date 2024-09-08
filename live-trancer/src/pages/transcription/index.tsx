'use client';

import { useEffect, useRef, useState } from 'react';

export default function TranscriptionPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const audioContextRef = useRef<AudioContext | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);

  const startRecording = async () => {
    try {
      // マイクデバイスから音声を取得
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);

      // ScriptProcessorNodeを使用して音声データを取得
      const processor = audioContextRef.current.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      processor.onaudioprocess = (event) => {
        const input = event.inputBuffer.getChannelData(0);
        const audioData = new Float32Array(input);

        if (socketRef.current?.readyState === WebSocket.OPEN) {
          // WebSocketで音声データを送信
          socketRef.current.send(audioData.buffer);
        }
      };

      // オーディオの接続を設定
      source.connect(processor);
      processor.connect(audioContextRef.current.destination);

      setIsRecording(true);
      console.log('Recording started...');
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }

    if (processorRef.current) {
      processorRef.current.disconnect();
    }

    setIsRecording(false);
    console.log('Recording stopped.');
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  useEffect(() => {
    // WebSocketサーバーに接続
    const socket = new WebSocket('ws://localhost:3000/api/transcription');
    socketRef.current = socket;

    // サーバーからメッセージを受信した場合の処理
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setTranscript((prev) => `${prev}\n${data.transcript}`);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // コンポーネントがアンマウントされるときにWebSocketを閉じる
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  return (
    <div>
      <h1>リアルタイム音声認識</h1>
      <button onClick={toggleRecording}>
        {isRecording ? '停止' : '録音開始'}
      </button>
      <div>
        <h2>認識結果:</h2>
        <pre>{transcript}</pre>
      </div>
    </div>
  );
}
