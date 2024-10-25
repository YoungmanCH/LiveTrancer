import { RecordingProcessorHelper } from "./recordingProcessorHelper";
import { AudioToStopStsStreamer } from "./audioToStopStsStreamer";
import { StartRecordingProps } from "@/types/type";

interface StopRecordingProps {
  socket: any;
  audioContext: AudioContext | null;
  processor: ScriptProcessorNode | null;
  setIsRecording: (value: boolean) => void;
}

export class RecordingProcessor {
  public async startRecording(props: StartRecordingProps) {
    const startHelper = new RecordingProcessorHelper();
    startHelper.handleStartRecording(props);
  }

  public async stopRecording(props: StopRecordingProps) {
    const { audioContext, processor, setIsRecording } = props;
    if (processor && audioContext && audioContext.state !== "closed") {
      processor.disconnect();
      await audioContext.close();
      console.log("通信を中断しました。");
    }
    setIsRecording(false);
    this._stopStreamingAudioToSts(props.socket);
  }

  private _stopStreamingAudioToSts(socket: any) {
    const audioToStopStsStreamer = new AudioToStopStsStreamer();
    audioToStopStsStreamer.stopStreamingAudioToSts(socket);
  }
}
