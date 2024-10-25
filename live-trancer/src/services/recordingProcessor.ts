import { RecordingStopProcessor } from "./recordingStopProcessor";
import { RecordingStartProcessor } from "./recordingStartProcessor";
import { StartRecordingProps, StopRecordingProps } from "@/types/type";

export class RecordingProcessor {
  public async startRecording(props: StartRecordingProps) {
    const startProcessor = new RecordingStartProcessor();
    startProcessor.handleStartRecording(props);
  }

  public async stopRecording(props: StopRecordingProps) {
    const stopProcessor = new RecordingStopProcessor();
    stopProcessor.handleStopRecording(props);
  }
}
