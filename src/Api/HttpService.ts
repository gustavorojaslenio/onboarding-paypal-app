import axios, { AxiosInstance } from "axios";

export type GetKaijuTypeApi = "ONE" | "TWO" | "THREE" | "UNKNOWN" | "ALL";

export type KaijuType = "TYPE I" | "TYPE II" | "TYPE III" | "unknown";

export interface PostKaijuDNAApi {
  dna: string;
}

class HttpService {
  service: AxiosInstance;

  static instance = new HttpService();

  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_KAIJU_API_URL,
      timeout: 5000,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  async get(kaijuType: GetKaijuTypeApi) {
    return await this.service.get(`stats?type=${kaijuType}`);
  }

  async post(payload: PostKaijuDNAApi) {
    return await this.service.post("dna", JSON.stringify(payload));
  }
}

export default HttpService.instance;
