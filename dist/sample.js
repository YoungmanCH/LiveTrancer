var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";
import fetch from 'cross-fetch';
import dotenv from 'dotenv';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
dotenv.config();
// URL for the realtime streaming audio you would like to transcribe
const url = "http://stream.live.vc.bbcmedia.co.uk/bbc_world_service";
// ファイルに書き出すためのストリームを作成
const dir = 'output';
if (!existsSync(dir)) {
    mkdirSync(dir);
}
const outputFile = createWriteStream(`${dir}/transcription_output.txt`, { flags: 'a' }); // 'a' は追記モード
const live = () => __awaiter(void 0, void 0, void 0, function* () {
    // STEP 1: Create a Deepgram client using the API key
    const deepgram = createClient(process.env.DEEPGRAM_API_KEY);
    // STEP 2: Create a live transcription connection
    const connection = deepgram.listen.live({
        model: "nova-2",
        language: "en-US",
        smart_format: true,
    });
    // STEP 3: Listen for events from the live transcription connection
    connection.on(LiveTranscriptionEvents.Open, () => {
        console.log("Connection opened.");
        connection.on(LiveTranscriptionEvents.Close, () => {
            console.log("Connection closed.");
            outputFile.end(); // ファイル書き込みストリームを閉じる
        });
        connection.on(LiveTranscriptionEvents.Transcript, (data) => {
            const transcript = data.channel.alternatives[0].transcript;
            console.log(transcript);
            outputFile.write(transcript + '\n'); // ファイルにリアルタイムで書き出す
        });
        connection.on(LiveTranscriptionEvents.Metadata, (data) => {
            console.log(data);
        });
        connection.on(LiveTranscriptionEvents.Error, (err) => {
            console.error(err);
        });
        // STEP 4: Fetch the audio stream and send it to the live transcription connection
        fetch(url)
            .then((r) => r.body)
            .then((res) => {
            res.on("readable", () => {
                connection.send(res.read());
            });
        });
    });
});
live();
