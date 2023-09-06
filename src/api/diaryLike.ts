import axios from 'axios';
import { DiaryLike } from '../type/diaryLike';
import HttpClient from '../network/http';

const headers = {
    'Content-Type': 'application/json',
    withCredentials: true,
};

const client = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL, // 기본 URL 설정
    withCredentials: true, // withCredentials 설정
});

const http = new HttpClient(process.env.REACT_APP_BASE_URL!);

// export async function getDiaryLikeCount(diaryId: string): Promise<any> {
//     const url: string = '/diary/like/' + diaryId;
//     return client.get(url).then((result) => result);
// }

// export async function getDiaryLikeCheck(diaryLike: DiaryLike): Promise<any> {
//     const url: string = '/diary/like';
//     return client.get(url, { params: { diaryLike } }).then((result) => result);
// }

export async function create(diaryLike: DiaryLike): Promise<any> {
    const url: string = '/diary/like';
    console.log('create', diaryLike);
    return http.client.post(url, diaryLike, headers).then((result) => result);
}

export async function remove(diaryLike: DiaryLike): Promise<any> {
    const url: string = '/diary/like/delete';
    console.log('remove123', diaryLike);

    return http.client
        .delete(url, { data: diaryLike, headers }) // 여기서 data 옵션 사용
        .then((result) => result);
}
