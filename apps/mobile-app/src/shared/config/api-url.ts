import Constants from "expo-constants";

// 開発中は Expo の開発サーバーと同じ PC の 8800 番、本番は本物の URL
const devHost = Constants.expoConfig?.hostUri?.split(":")[0] ?? "localhost";

export const API_URL = __DEV__
  ? `http://${devHost}:8800`
  : "https://urekoi.com";
