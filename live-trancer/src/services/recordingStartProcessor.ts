import { RecordingStopProcessor } from "./recordingStopProcessor";
import { RecordingProcessorHelper } from "./recordingProcessorHelper";
import { AudioProcessing } from "./audioProcessing";
import { StartRecordingProps, StopRecordingProps, HandleStartRecordingProps } from "@/types/type";

interface SetRecordingProps {
  audioContext: AudioContext;
  processor: ScriptProcessorNode;
  setAudioContext: (context: AudioContext) => void;
  setProcessor: (processor: ScriptProcessorNode) => void;
  setIsRecording: (value: boolean) => void;
}

export class RecordingStartProcessor {
  public async handleStartRecording(props: StartRecordingProps) {
    const { socket, setAudioContext, setProcessor, setIsRecording } = props;
    if (!socket) return;
    const audioProcessing = new AudioProcessing();
    const audioContext = this._activateAudioContext(audioProcessing);
    const processor = this._createScriptProcessor(
      audioProcessing,
      audioContext
    );

    this._setRecording({
      audioContext: audioContext,
      processor: processor,
      setAudioContext: setAudioContext,
      setProcessor: setProcessor,
      setIsRecording: setIsRecording,
    });

    this._handleStartRecording({socket: socket, audioContext: audioContext});

    const stopProps: StopRecordingProps = {
      socket,
      audioContext,
      processor,
      setIsRecording,
    };
    this._setTimeoutLimiter(stopProps);
  }

  private _activateAudioContext(
    audioProcessing: AudioProcessing
  ): AudioContext {
    return audioProcessing.activateAudioContext();
  }

  private _createScriptProcessor(
    audioProcessing: AudioProcessing,
    audioContext: AudioContext
  ) {
    return audioProcessing.createScriptProcessor(audioContext);
  }

  private _setRecording(props: SetRecordingProps) {
    const {
      audioContext,
      processor,
      setAudioContext,
      setProcessor,
      setIsRecording,
    } = props;

    setAudioContext(audioContext);
    setProcessor(processor);
    setIsRecording(true);
  }

  private _handleStartRecording(props: HandleStartRecordingProps) {
    const { socket, audioContext } = props;
    const startHelper = new RecordingProcessorHelper();
    startHelper.handleStartRecording({
      socket: socket,
      audioContext: audioContext,
    });
  }

  private _setTimeoutLimiter(props: StopRecordingProps) {
    const max_audio_limit = 60000;

    setTimeout(() => {
      console.log("time out: ", max_audio_limit);
      this._handleStopRecording(props);
    }, max_audio_limit);
  }

  private _handleStopRecording(props: StopRecordingProps) {
    const stopProcessor = new RecordingStopProcessor();
    stopProcessor.handleStopRecording(props);
  }
}
