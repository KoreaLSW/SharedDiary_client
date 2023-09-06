import axios from 'axios';
import HttpClient from '../network/http';

const headers = {
    'Content-Type': 'multipart/form-data',
    withCredentials: true,
};

const client = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL, // 기본 URL 설정
    withCredentials: true, // withCredentials 설정
});

const http = new HttpClient(process.env.REACT_APP_BASE_URL!);

export async function getUser(userId: string): Promise<any> {
    const url: string = '/user/' + userId;
    return http.client.get(url, headers).then((result) => result);
}

export async function update(user: FormData): Promise<any> {
    const url: string = '/user';
    return http.client.post(url, user, headers).then((result) => result);
}
