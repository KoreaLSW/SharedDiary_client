import axios from 'axios';
import { SetComments, RemoveComments } from '../type/comment';

const headers = {
    'Content-Type': 'application/json',
    withCredentials: true,
};

const client = axios.create({
    baseURL: 'http://localhost:8080', // 기본 URL 설정
    withCredentials: true, // withCredentials 설정
});

export async function getComment(
    userId: string,
    diaryId: string
): Promise<any> {
    const url: string = '/diary/comment';
    return client
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
    return client.post(url, comments, headers).then((result) => result);
}

export async function remove(comments: RemoveComments): Promise<any> {
    const url: string = '/diary/comment/delete';
    return client
        .delete(url, {
            data: { commentId: comments.comment_id, userId: comments.user_id },
            headers,
        }) // 여기서 data 옵션 사용
        .then((result) => result);
}
