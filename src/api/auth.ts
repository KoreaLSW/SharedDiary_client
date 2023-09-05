import axios, { AxiosRequestConfig } from 'axios';
import { Login, SignUp } from '../type/auth';
import HttpClient from '../network/http';

// const headers = {
//     'Content-Type': 'multipart/form-data',
//     withCredentials: true,
// };

// const client = axios.create({
//     baseURL: process.env.REACT_APP_BASE_URL, // 기본 URL 설정
//     withCredentials: true, // withCredentials 설정
//     headers,
// });

const http = new HttpClient(process.env.REACT_APP_BASE_URL!);

export async function signUp(user: FormData): Promise<any> {
    const url: string = '/auth/signup';
    return http.client.post(url, user).then((result) => result);
}

export async function login(user: Login): Promise<any> {
    const url: string = '/auth/login';
    return http.client.post(url, user).then((result) => result);
}

export async function logout(): Promise<any> {
    const url: string = '/auth/logout';
    return http.client.post(url).then((result) => result);
}

export async function me(): Promise<any> {
    const url: string = '/auth/me';
    return http.client.get(url).then((result) => result);
}

export async function getType(type: string): Promise<any> {
    const url: string = '/type/' + type;
    const result = await http.client.get(url);
    return result.data; // 반환값으로 데이터만 사용
}

export async function update(user: FormData): Promise<any> {
    const url: string = '/auth/update';
    return http.client.post(url, user).then((result) => result);
}
