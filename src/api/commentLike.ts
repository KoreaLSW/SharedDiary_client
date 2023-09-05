import axios from 'axios';
import { DiaryLike } from '../type/diaryLike';
import { CommentLike } from '../type/commentLike';

const headers = {
    'Content-Type': 'application/json',
    withCredentials: true,
};

const client = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL, // 기본 URL 설정
    withCredentials: true, // withCredentials 설정
});

// export async function getDiaryLikeCount(diaryId: string): Promise<any> {
//     const url: string = '/diary/like/' + diaryId;
//     return client.get(url).then((result) => result);
// }

// export async function getDiaryLikeCheck(diaryLike: DiaryLike): Promise<any> {
//     const url: string = '/diary/like';
//     return client.get(url, { params: { diaryLike } }).then((result) => result);
// }

export async function create(commnetLike: CommentLike): Promise<any> {
    const url: string = '/diary/comment/like';
    console.log('create', commnetLike);
    return client.post(url, commnetLike, headers).then((result) => result);
}

export async function remove(commnetLike: CommentLike): Promise<any> {
    const url: string = '/diary/comment/like/delete';
    console.log('remove123', commnetLike);

    return client
        .delete(url, { data: commnetLike, headers }) // 여기서 data 옵션 사용
        .then((result) => result);
}
