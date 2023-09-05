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
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true,
        });
        axiosRetry(this.client, {
            retries: this.config.retries, // 몇번을 시도하는지
            retryDelay: (retry) => {
                // 시도하는 시간
                // 점진적으로 재시도하는 시간을 늘려줌
                const delay = Math.pow(2, retry) * this.config.initialDelayMs; // 100, 200, 400, 800, 1600
                // 재시도하는 시간에 랜덤한 숫자를 추가해서 비규칙적으로 만들어서 사용자들끼리 재시도하는 시간을 겹치지 않게 해줌
                const jitter = delay * 0.1 * Math.random(); // 10, 20, .... 160
                return delay + jitter;
            },
            // error코드가 429일때만 재시도를 함
            retryCondition: (err: any) =>
                // isNetworkOrIdempotentRequestError : 네트워크 관련된 오류이거나
                // 멱등상오류(멱등성 요청은 동일한 요청을 여러 번 보내더라도 동일한 결과가 나와야 하는 요청을 의미(ex: Get요청))인 경우
                // true를 반환함
                axiosRetry.isNetworkOrIdempotentRequestError(err) ||
                err.response.status === 429,
        });
    }
}
