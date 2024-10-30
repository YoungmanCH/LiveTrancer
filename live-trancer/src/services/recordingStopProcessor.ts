import { AudioToStopStsStreamer } from "./audioToStopStsStreamer";
import { StopRecordingProps } from "@/types/type";

export class RecordingStopProcessor {
  public async handleStopRecording(props: StopRecordingProps) {
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
