import { AudioProcessing } from "./audioProcessing";
import { UserMediaStream } from "./userMediaStream";
import { AudioToStsStreamer } from "./audioToStsStreamer";
import { AudioToStsStreamerProps, StartRecordingProps } from "@/types/type";

interface ProcessStreamingProps {
  audioContext: AudioContext;
  stream: MediaStream;
  startRecordingProps: StartRecordingProps;
}

export class StreamingAudioStopHelper {
  private audioProcessing: AudioProcessing = new AudioProcessing();
  private userMediaStream: UserMediaStream = new UserMediaStream();
  private audioToStsStreamer: AudioToStsStreamer = new AudioToStsStreamer();

  public async handleStopRecording(props: StartRecordingProps) {
    const { socket } = props;
    if (!socket) return;

    const audioContext = new AudioContext();
    const stream = await this._getUserDeviceMedia();

    if (stream) {
      this._processStreaming({
        audioContext: audioContext,
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

  private _processStreaming(props: ProcessStreamingProps) {
    const { audioContext, stream, startRecordingProps } = props;
    const input = this._createMediaStreamSource(audioContext, stream);
    const processor = this._createScriptProcessor(audioContext);
    this._streamAudioToSts({
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

  private _streamAudioToSts(props: AudioToStsStreamerProps) {
    this.audioToStsStreamer.startStreamingAudioToSts(props);
  }
}
