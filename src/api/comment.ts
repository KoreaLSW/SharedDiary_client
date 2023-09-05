import axios from 'axios';
import { SetComments, RemoveComments } from '../type/comment';
import HttpClient from '../network/http';

const http = new HttpClient(process.env.REACT_APP_BASE_URL!);

export async function getComment(
    userId: string,
    diaryId: string
): Promise<any> {
    const url: string = '/diary/comment';
    return http.client
        .get(url, {
            params: {
                user_id: userId,
                diary_id: diaryId,
            },
        })
        .then((result) => result);
}

export async function create(comments: SetComments): Promise<any> {
    const url: string = '/diary/comment/';
    return http.client.post(url, comments).then((result) => result);
}

export async function remove(comments: RemoveComments): Promise<any> {
    const url: string = '/diary/comment/delete';
    return http.client
        .delete(url, {
            data: { commentId: comments.comment_id, userId: comments.user_id },
        }) // 여기서 data 옵션 사용
        .then((result) => result);
}
