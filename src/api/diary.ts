import axios from 'axios';
import {
    SetDiary,
    GetDiary,
    UpdateDiary,
    DeleteDiary,
    SelectDiaryMonth,
} from '../type/diary';

const headers = {
    'Content-Type': 'multipart/form-data',
    withCredentials: true,
};

const client = axios.create({
    baseURL: 'http://localhost:8080', // 기본 URL 설정
    withCredentials: true, // withCredentials 설정
});

export async function getAll(
    userId: string,
    page: number,
    offset: number
): Promise<any> {
    const url: string = '/diary/all';
    return client
        .get(url, {
            params: { userId, page, offset },
        })
        .then((result) => result);
}

export async function getByUserId(userId: string): Promise<any> {
    const url: string = '/diary';
    return client.get(url, { params: { userId } }).then((result) => result);
}

export async function getByUserIdPage(
    userId: string,
    page: number,
    offset: number
): Promise<any> {
    const url: string = '/diary/page';
    return client
        .get(url, { params: { userId, page, offset } })
        .then((result) => result);
}

export async function getByMonthHome(data: SelectDiaryMonth): Promise<any> {
    const url: string = '/diary/month/home';
    return client
        .get(url, {
            params: { user_id: data.user_id, month: data.month },
        })
        .then((result) => result);
}

export async function getByMonth(
    data: SelectDiaryMonth,
    page: number,
    offset: number
): Promise<any> {
    const url: string = '/diary/month/page';
    return client
        .get(url, {
            params: { user_id: data.user_id, month: data.month, page, offset },
        })
        .then((result) => result);
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
