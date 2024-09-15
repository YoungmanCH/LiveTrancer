import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

const portNumber = 3001;

// Socket.IOのセットアップ
const io = new Server(portNumber, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// サーバー起動確認用のログ
console.log("Socket.IO server is running on port ", portNumber);

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  let connection: any;

  socket.on("audio-stream", (audioData: Buffer) => {
    // console.log(`Received audio data from client ${socket.id}`);

    connection = deepgram.listen.live({
      punctuate: true,
      interim_results: false,
      language: "ja",
    });

    // Deepgramからのトランスクリプション結果を受け取る
    connection.on(LiveTranscriptionEvents.Transcript, (data: any) => {
      const transcript = data.channel.alternatives[0].transcript;
      console.log("Transcript:", transcript);

      // クライアントにトランスクリプション結果を送信
      socket.emit("transcription", transcript);
    });

    connection.on(LiveTranscriptionEvents.Error, (err: any) => {
      console.error("Error:", err);
    });

    // console.log("Sending audio chunk to Deepgram");
    connection.send(audioData);
  });

  // クライアントが切断されたときに接続を閉じる
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    console.log("Closing Deepgram connection");
  });
});
