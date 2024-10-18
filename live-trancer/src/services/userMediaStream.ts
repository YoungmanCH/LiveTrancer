export class UserMediaStream {
  public async getUserDeviceMedia(): Promise<MediaStream | null> {
    try {
      return await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (e: any) {
      console.error("Error accessing user media:", e);
      return null;
    }
  }
}
