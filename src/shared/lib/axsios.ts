import axios, { AxiosInstance } from "axios";
import { getItem } from "./localStroage";
import { ResponseLoginDto } from "@/pages";
import { VITE_APP_BE_URL, generateSecret, generateSignature } from "./helper";

class ApiInstance {
  public axios: AxiosInstance;
  public datauser = getItem<ResponseLoginDto>("userdata");
  public timestamp = new Date().toISOString();
  public signature = generateSignature(this.timestamp);
  public secret = generateSecret();

  constructor() {
    this.axios = axios.create({
      baseURL: VITE_APP_BE_URL,
      timeout: 120000,
      headers: {
        "Content-Type": "application/json",
        timestamp: this.timestamp,
        signature: this.signature,
        user_id: this.datauser?.user_id,
        Authorization:
          this.datauser && this.datauser.access_token
            ? `Bearer ${this.datauser.access_token}`
            : undefined
      }
    });
  }
}

export const apiInstance = new ApiInstance();
