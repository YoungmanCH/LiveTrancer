import { AudioProcessing } from "./audioProcessing";
import { UserMediaStream } from "./userMediaStream";
import { AudioToStartStsStreamer } from "./audioToStartStsStreamer";
import {
  HandleStartRecordingProps,
  AudioToStsStreamerProps,
} from "@/types/type";
import { UnlimitedAudioToStartStsStreamer } from "../../tests/unlimitedAudioToStartStsStreamer";

interface ProcessStreamingProps {
  socket: any;
  audioContext: AudioContext;
  stream: MediaStream;
}

export class RecordingProcessorHelper {
  private audioProcessing: AudioProcessing = new AudioProcessing();
  private userMediaStream: UserMediaStream = new UserMediaStream();
  private audioToStartStsStreamer: AudioToStartStsStreamer =
    new AudioToStartStsStreamer();

  // private audioToStartStsStreamer: UnlimitedAudioToStartStsStreamer =
  //   new UnlimitedAudioToStartStsStreamer();

  public async handleStartRecording(props: HandleStartRecordingProps) {
    const { socket, audioContext } = props;
    const stream = await this._getUserDeviceMedia();

    if (stream) {
      await this._processStreaming({
        socket: socket,
        audioContext: audioContext,
        stream: stream,
      });
    } else {
      console.log("Failed to acquire MediaStream.");
    }
  }

  private async _getUserDeviceMedia() {
    return await this.userMediaStream.getUserDeviceMedia();
  }

  private async _processStreaming(props: ProcessStreamingProps) {
    const { socket, audioContext, stream } = props;

    const input = this._createMediaStreamSource(stream, audioContext);
    const processor = this._createScriptProcessor(audioContext);

    await this._streamAudioToSts({
      input: input,
      processor: processor,
      audioContext: audioContext,
      socket: socket,
      downsampleBuffer: this.audioProcessing.downsampleBuffer,
    });
  }

  private _createMediaStreamSource(
    stream: MediaStream,
    audioContext: AudioContext
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
