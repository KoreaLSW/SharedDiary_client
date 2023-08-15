import axios from 'axios';
import { CreateComments, RemoveComments } from '../type/comment';

const headers = {
    'Content-Type': 'application/json',
    withCredentials: true,
};

const client = axios.create({
    baseURL: 'http://localhost:8080', // 기본 URL 설정
    withCredentials: true, // withCredentials 설정
});

export async function getComment(diaryId: string): Promise<any> {
    const url: string = '/diary/comment/' + diaryId;
    return client.get(url).then((result) => result);
}

export async function create(comments: CreateComments): Promise<any> {
    console.log('create', comments);
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
