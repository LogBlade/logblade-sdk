import axios from "axios";

const APIURL = "http://localhost:3000/";

interface LogOptions {
  title: string;
  application: string;
  subApplication: string;
  message?: string;
  emoji?: string;
  color?: string;
}
interface LogBladeOptions {
  application: string;
}

export default class LogBlade {
  token: string;
  options: LogBladeOptions | undefined;
  constructor(APIKEY: string, options?: LogBladeOptions) {
    this.token = APIKEY;
    this.options = options;

    if (this.token == null || this.token == "") {
      throw new Error("APIKEY is required");
    }
  }
  async log({
    title,
    application,
    subApplication,
    message,
    emoji,
    color = "GREEN",
  }: LogOptions) {
    return new Promise((resolve, reject) => {
      console.log(title, application, subApplication, message, emoji, color);
      axios.post(APIURL + "send/log", {
        title,
        application: application || this.options?.application,
        subApplication,
        message,
        emoji,
        color,
      },
       {headers: {
        "Content-Type": "application/json",
        "authorization": this.token,
      }})
        .then((body) => (body.data.success ? resolve(body.data) : reject(body.data)))
        .catch(reject);
    });
  }
}
