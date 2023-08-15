import axios from 'axios';
import { SetDiary, GetDiary } from '../type/diary';

const headers = {
    'Content-Type': 'application/json',
    withCredentials: true,
};

const client = axios.create({
    baseURL: 'http://localhost:8080', // 기본 URL 설정
    withCredentials: true, // withCredentials 설정
});

export async function getAll(userId: string): Promise<any> {
    const url: string = '/diary/' + userId;
    return client.get(url).then((result) => result);
}

export async function getByUserId(userId: string): Promise<any> {
    console.log('getByUserId', userId);
    const url: string = '/diary';
    return client.get(url, { params: { userId } }).then((result) => result);
}

export async function create(diary: SetDiary): Promise<any> {
    console.log('create');
    const url: string = '/diary';
    return client
        .post(url, { params: { diary }, headers })
        .then((result) => result);
}

export async function update(data: {
    diaryId: string;
    diary: GetDiary;
}): Promise<any> {
    const url: string = '/diary/' + data.diaryId;
    return client
        .put(url, { params: data.diary, headers })
        .then((result) => result);
}

export async function remove(diaryId: string): Promise<any> {
    const url: string = '/diary/' + diaryId;
    return client.delete(url, { headers }).then((result) => result);
}
