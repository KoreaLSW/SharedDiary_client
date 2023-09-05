import axios from 'axios';
import HttpClient from '../network/http';

const http = new HttpClient(process.env.REACT_APP_BASE_URL!);

export async function getUser(userId: string): Promise<any> {
    const url: string = '/user/' + userId;
    return http.client.get(url).then((result) => result);
}

export async function update(user: FormData): Promise<any> {
    const url: string = '/user';
    return http.client.post(url, user).then((result) => result);
}
