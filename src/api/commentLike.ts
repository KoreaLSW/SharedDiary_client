import axios from 'axios';
import { DiaryLike } from '../type/diaryLike';
import { CommentLike } from '../type/commentLike';
import HttpClient from '../network/http';

// export async function getDiaryLikeCount(diaryId: string): Promise<any> {
//     const url: string = '/diary/like/' + diaryId;
//     return client.get(url).then((result) => result);
// }

// export async function getDiaryLikeCheck(diaryLike: DiaryLike): Promise<any> {
//     const url: string = '/diary/like';
//     return client.get(url, { params: { diaryLike } }).then((result) => result);
// }

const http = new HttpClient(process.env.REACT_APP_BASE_URL!);

export async function create(commnetLike: CommentLike): Promise<any> {
    const url: string = '/diary/comment/like';
    console.log('create', commnetLike);
    return http.client.post(url, commnetLike).then((result) => result);
}

export async function remove(commnetLike: CommentLike): Promise<any> {
    const url: string = '/diary/comment/like/delete';
    console.log('remove123', commnetLike);

    return http.client
        .delete(url, { data: commnetLike }) // 여기서 data 옵션 사용
        .then((result) => result);
}
