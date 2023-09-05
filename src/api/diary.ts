import axios from 'axios';
import {
    SetDiary,
    GetDiary,
    UpdateDiary,
    DeleteDiary,
    SelectDiaryMonth,
} from '../type/diary';
import HttpClient from '../network/http';

const http = new HttpClient(process.env.REACT_APP_BASE_URL!);

export async function getAll(
    userId: string,
    page: number,
    offset: number
): Promise<any> {
    const url: string = '/diary/all';
    return http.client
        .get(url, {
            params: { userId, page, offset },
        })
        .then((result) => result);
}

export async function getByUserId(userId: string): Promise<any> {
    const url: string = '/diary';
    return http.client
        .get(url, { params: { userId } })
        .then((result) => result);
}

export async function getByUserIdPage(
    userId: string,
    page: number,
    offset: number
): Promise<any> {
    const url: string = '/diary/page';
    return http.client
        .get(url, { params: { userId, page, offset } })
        .then((result) => result);
}

export async function getByMonthHome(data: SelectDiaryMonth): Promise<any> {
    const url: string = '/diary/month/home';
    return http.client
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
    return http.client
        .get(url, {
            params: { user_id: data.user_id, month: data.month, page, offset },
        })
        .then((result) => result);
}

export async function create(diary: FormData): Promise<any> {
    const url: string = '/diary';
    return http.client.post(url, diary).then((result) => result);
}

export async function update(diary: UpdateDiary): Promise<any> {
    const url: string = '/diary/' + diary.diary_id;
    return http.client.put(url, diary.diary).then((result) => result);
}

export async function remove(diary: DeleteDiary): Promise<any> {
    const url: string = '/diary';
    return http.client
        .delete(url, {
            params: { diaryId: diary.diary_id, userId: diary.user_id },
        })
        .then((result) => result);
}
