interface RequestLimitData {
  count: number;
  lastRequestDate: string | null;
}

export class StsTrialClientLimiter {
  public static checkStartRecording(): boolean {
    const max_requests_per_day = 5;
    const today = new Date().toISOString().split("T")[0];
    let requestData = this._getRequestData();

    if (requestData.lastRequestDate !== today) {
      this._consoleRequestCount(requestData.count);
      requestData = this._resetRequestCount(today);
      this._incrementRequestCount();
      return true;
    } else if (requestData.count < max_requests_per_day) {
      this._consoleRequestCount(requestData.count);
      this._incrementRequestCount();
      return true;
    }

    this._consoleRequestCount(requestData.count);
    return false;
  }

  private static _getRequestData(): RequestLimitData {
    const requestData = localStorage.getItem("requestData");
    return requestData
      ? JSON.parse(requestData)
      : { count: 0, lastRequestDate: null };
  }

  private static _consoleRequestCount(requestCount: Number) {
    console.log("クライアント側のリクエスト回数: ", requestCount);
  }

  private static _resetRequestCount(today: string): RequestLimitData {
    console.log("日付が変わったため、リクエスト回数をリセットしました");
    const resetData: RequestLimitData = { count: 0, lastRequestDate: today };
    localStorage.setItem("requestData", JSON.stringify(resetData));
    return resetData;
  }

  private static _incrementRequestCount() {
    const today = new Date().toISOString().split("T")[0];
    const requestData = this._getRequestData();

    const updatedData = {
      count: requestData.lastRequestDate === today ? requestData.count + 1 : 1,
      lastRequestDate: today,
    };

    localStorage.setItem("requestData", JSON.stringify(updatedData));
  }
}
