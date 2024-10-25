interface RequestLimitData {
  count: number;
  lastRequestDate: string | null;
}

export class StsTrialClientLimiter {
  public static checkStartRecording(): boolean {
    const max_requests_per_day = 5;
    const today = new Date().toISOString().split("T")[0];
    const requestData = this._getRequestData();
    console.log("クライアント側のリクエスト回数: ", requestData.count);

    return (
      requestData.lastRequestDate !== today ||
      requestData.count < max_requests_per_day
    );
  }

  public static incrementRequestCount() {
    const today = new Date().toISOString().split("T")[0];
    const requestData = this._getRequestData();

    const updatedData = {
      count: requestData.lastRequestDate === today ? requestData.count + 1 : 1,
      lastRequestDate: today,
    };

    localStorage.setItem("requestData", JSON.stringify(updatedData));
  }

  private static _getRequestData(): RequestLimitData {
    const requestData = localStorage.getItem("requestData");
    return requestData
      ? JSON.parse(requestData)
      : { count: 0, lastRequestDate: null };
  }
}
