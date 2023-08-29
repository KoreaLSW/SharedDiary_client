import axios, { AxiosRequestConfig } from 'axios';
import { Login, SignUp } from '../type/auth';

const headers = {
    'Content-Type': 'multipart/form-data',
    withCredentials: true,
};

const client = axios.create({
    baseURL: 'http://localhost:8080', // 기본 URL 설정
    withCredentials: true, // withCredentials 설정
});

export async function signUp(user: FormData): Promise<any> {
    const url: string = '/auth/signup';
    return client.post(url, user, headers).then((result) => result);
}

export async function login(user: Login): Promise<any> {
    const url: string = '/auth/login';
    return client.post(url, user, headers).then((result) => result);
}

export async function logout(): Promise<any> {
    const url: string = '/auth/logout';
    return client.post(url, headers).then((result) => result);
}

export async function me(): Promise<any> {
    const url: string = '/auth/me';
    return client.get(url, headers).then((result) => result);
}

export async function getType(type: string): Promise<any> {
    const url: string = '/type/' + type;
    const result = await client.get(url);
    return result.data; // 반환값으로 데이터만 사용
}

export async function update(user: FormData): Promise<any> {
    const url: string = '/auth/update';
    return client.post(url, user, headers).then((result) => result);
}
