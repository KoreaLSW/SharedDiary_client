import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';

type Config = {
    retries: number;
    initialDelayMs: number;
};

const defaultRetryConfig: Config = {
    retries: 5,
    initialDelayMs: 100,
};

export default class HttpClient {
    client: AxiosInstance;
    config: Config;

    constructor(private baseURL: string) {
        this.baseURL = baseURL;
        this.config = defaultRetryConfig;

        this.client = axios.create({
            baseURL: this.baseURL,
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });
        axiosRetry(this.client, {
            retries: this.config.retries,
            retryDelay: (retry) => {
                const delay = Math.pow(2, retry) * this.config.initialDelayMs; // 100, 200, 400, 800, 1600
                const jitter = delay * 0.1 * Math.random(); // 10, 20, .... 160
                return delay + jitter;
            },
            retryCondition: (err: any) =>
                axiosRetry.isNetworkOrIdempotentRequestError(err) ||
                err.response.status === 429,
        });
    }

    async auth(url: string) {
        this.client.post(url);
    }
}
