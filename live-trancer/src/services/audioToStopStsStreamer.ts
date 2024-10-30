export class AudioToStopStsStreamer {
  public stopStreamingAudioToSts(socket: any) {
    socket.emit("stop_recording");
    socket.on("stop_recording", (audioBuffer: any) =>
      this._downloadAudioToSts(audioBuffer)
    );
  }

  private _downloadAudioToSts(audioBuffer: any) {
    if (audioBuffer && audioBuffer.byteLength > 0) {
      const blob = new Blob([audioBuffer], { type: "audio/wav" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "sample_sts_audio.wav";
      document.body.appendChild(link);
      link.click();
      console.log("Downloaded STS Audio.");
    } else {
      console.error("Received empty or invalid audio buffer.");
    }
  }
}