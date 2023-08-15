import axios from 'axios';
import { DiaryLike } from '../type/diaryLike';

const headers = {
    'Content-Type': 'application/json',
    withCredentials: true,
};

const client = axios.create({
    baseURL: 'http://localhost:8080', // 기본 URL 설정
    withCredentials: true, // withCredentials 설정
});

export async function getDiaryLikeCount(diaryId: string): Promise<any> {
    const url: string = '/diary/like/' + diaryId;
    return client.get(url).then((result) => result);
}

export async function getDiaryLikeCheck(diaryLike: DiaryLike): Promise<any> {
    const url: string = '/diary/like';
    return client.get(url, { params: { diaryLike } }).then((result) => result);
}

export async function create(diaryLike: DiaryLike): Promise<any> {
    const url: string = '/diary/like';
    console.log('create', diaryLike);
    return client.post(url, diaryLike, headers).then((result) => result);
}

export async function remove(diaryLike: DiaryLike): Promise<any> {
    const url: string = '/diary/like/delete';
    console.log('remove123', diaryLike);

    return client
        .delete(url, { data: diaryLike, headers }) // 여기서 data 옵션 사용
        .then((result) => result);
}
