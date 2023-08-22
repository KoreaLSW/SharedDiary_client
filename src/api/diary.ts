import axios from 'axios';
import { SetDiary, GetDiary, UpdateDiary, DeleteDiary } from '../type/diary';

const headers = {
    'Content-Type': 'multipart/form-data',
    withCredentials: true,
};

const client = axios.create({
    baseURL: 'http://localhost:8080', // 기본 URL 설정
    withCredentials: true, // withCredentials 설정
});

export async function getAll(userId: string): Promise<any> {
    const url: string = '/diary/' + userId;
    return client
        .get(url, {
            params: { userId },
        })
        .then((result) => result);
}

export async function getByUserId(userId: string): Promise<any> {
    const url: string = '/diary';
    return client.get(url, { params: { userId } }).then((result) => result);
}

export async function create(diary: FormData): Promise<any> {
    const url: string = '/diary';
    return client.post(url, diary, headers).then((result) => result);
}

export async function update(diary: UpdateDiary): Promise<any> {
    const url: string = '/diary/' + diary.diary_id;
    return client.put(url, diary.diary, headers).then((result) => result);
}

export async function remove(diary: DeleteDiary): Promise<any> {
    const url: string = '/diary';
    return client
        .delete(url, {
            params: { diaryId: diary.diary_id, userId: diary.user_id },
        })
        .then((result) => result);
}
