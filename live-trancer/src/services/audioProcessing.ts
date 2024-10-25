import { DownsampleBufferProps } from "@/types/type";

export class AudioProcessing {
  private readonly scriptProcessorBufferSize: number = 1024;
  private readonly numberOfInputChannels: number = 1;
  private readonly numberOfOutputChannels: number = 1;
  private readonly downsampleRate: number = 16000;

  public activateAudioContext(): AudioContext {
    return new AudioContext();
  }

  public createScriptProcessor(
    audioContext: AudioContext
  ): ScriptProcessorNode {
    return audioContext.createScriptProcessor(
      this.scriptProcessorBufferSize,
      this.numberOfInputChannels,
      this.numberOfOutputChannels
    );
  }

  public downsampleBuffer = (props: DownsampleBufferProps) => {
    const { buffer, sampleRate } = props;
    const sampleRateRatio = sampleRate / this.downsampleRate;
    const newLength = Math.round(buffer.length / sampleRateRatio);
    const result = new Int16Array(newLength);
    const MAX_INT16 = 0x7fff;
    let resultIndex = 0;
    let bufferIndex = 0;

    while (resultIndex < result.length) {
      const nextBufferIndex = Math.round((resultIndex + 1) * sampleRateRatio);
      result[resultIndex] =
        this._averageBufferValues(buffer, bufferIndex, nextBufferIndex) *
        MAX_INT16;
      resultIndex++;
      bufferIndex = nextBufferIndex;
    }

    return result.buffer;
  };

  private _averageBufferValues = (
    buffer: Float32Array,
    start: number,
    end: number
  ) => {
    let sum = 0;
    let count = 0;
    for (let i = start; i < end && i < buffer.length; i++) {
      sum += buffer[i];
      count++;
    }
    return count > 0 ? sum / count : 0;
  };
}
