import { AudioProcessing } from "./audioProcessing";
import { UserMediaStream } from "./userMediaStream";
import { AudioToStartStsStreamer } from "./audioToStartStsStreamer";
import { AudioToStsStreamerProps, StartRecordingProps } from "@/types/type";

interface ProcessStreamingProps {
  stream: MediaStream;
  startRecordingProps: StartRecordingProps;
}

export class RecordingProcessorHelper {
  private audioProcessing: AudioProcessing = new AudioProcessing();
  private userMediaStream: UserMediaStream = new UserMediaStream();
  private audioToStartStsStreamer: AudioToStartStsStreamer = new AudioToStartStsStreamer();

  public async handleStartRecording(props: StartRecordingProps) {
    const { socket } = props;
    if (!socket) return;

    const stream = await this._getUserDeviceMedia();

    if (stream) {
      await this._processStreaming({
        stream: stream,
        startRecordingProps: props,
      });
    } else {
      console.log("Failed to acquire MediaStream.");
    }
  }

  private async _getUserDeviceMedia() {
    return await this.userMediaStream.getUserDeviceMedia();
  }

  private async _processStreaming(props: ProcessStreamingProps) {
    const { stream, startRecordingProps } = props;
    const audioContext = new AudioContext();

    const input = this._createMediaStreamSource(audioContext, stream);
    const processor = this._createScriptProcessor(audioContext);

    await this._streamAudioToSts({
      input: input,
      processor: processor,
      audioContext: audioContext,
      socket: startRecordingProps.socket,
      downsampleBuffer: this.audioProcessing.downsampleBuffer,
    });

    startRecordingProps.setAudioContext(audioContext);
    startRecordingProps.setProcessor(processor);
    startRecordingProps.setIsRecording(true);
  }

  private _createMediaStreamSource(
    audioContext: AudioContext,
    stream: MediaStream
  ): MediaStreamAudioSourceNode {
    return audioContext.createMediaStreamSource(stream);
  }

  private _createScriptProcessor(
    audioContext: AudioContext
  ): ScriptProcessorNode {
    return this.audioProcessing.createScriptProcessor(audioContext);
  }

  private async _streamAudioToSts(props: AudioToStsStreamerProps) {
    await this.audioToStartStsStreamer.startStreamingAudioToSts(props);
  }
}
