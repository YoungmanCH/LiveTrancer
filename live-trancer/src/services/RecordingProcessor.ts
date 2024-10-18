import { AudioProcessing } from "./AudioProcessing";
import { UserMediaStream } from "./UserMediaStream";
import { AudioToSttStreamer } from "./AudioToSttStreamer";

interface StartRecordingProps {
  setIsRecording: (value: boolean) => void;
  socket: any;
  setAudioContext: (context: AudioContext) => void;
  setProcessor: (processor: ScriptProcessorNode) => void;
}

interface StopRecordingProps {
  audioContext: AudioContext | null;
  processor: ScriptProcessorNode | null;
  setIsRecording: (value: boolean) => void;
}

export class RecordingProcessor {
  private audioProcessing: AudioProcessing = new AudioProcessing();
  private userMediaStream: UserMediaStream = new UserMediaStream();
  private audioToSttStreamer: AudioToSttStreamer = new AudioToSttStreamer();

  public async startRecording(props: StartRecordingProps) {
    const { setIsRecording, socket, setAudioContext, setProcessor } = props;
    if (!socket) return;

    const audioContext = new AudioContext();
    const stream = await this.userMediaStream.getUserDeviceMedia();

    if (stream) {
      const input = audioContext.createMediaStreamSource(stream);
      const processor =
        this.audioProcessing.createScriptProcessor(audioContext);
      this.audioToSttStreamer.streamAudioToStt({
        input,
        processor,
        audioContext,
        socket,
        downsampleBuffer: this.audioProcessing.downsampleBuffer,
      });

      setAudioContext(audioContext);
      setProcessor(processor);
      setIsRecording(true);
    } else {
      console.log("Failed to acquire MediaStream.");
    }
  }

  public async stopRecording(props: StopRecordingProps) {
    const { audioContext, processor, setIsRecording } = props;
    if (processor && audioContext && audioContext.state !== "closed") {
      processor.disconnect();
      await audioContext.close();
      console.log("通信を中断しました。");
    }
    setIsRecording(false);
  }
}
