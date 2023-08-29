import axios from 'axios';

const headers = {
    'Content-Type': 'multipart/form-data',
    withCredentials: true,
};

const client = axios.create({
    baseURL: 'http://localhost:8080', // 기본 URL 설정
    withCredentials: true, // withCredentials 설정
});

export async function getUser(userId: string): Promise<any> {
    const url: string = '/user/' + userId;
    return client.get(url, headers).then((result) => result);
}

export async function update(user: FormData): Promise<any> {
    const url: string = '/user';
    return client.post(url, user, headers).then((result) => result);
}
