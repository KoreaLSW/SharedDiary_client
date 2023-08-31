import axios from 'axios';
import { ChatRoomUsers, UpdateChatTitle } from '../type/chatRoom';

const headers = {
    'Content-Type': 'application/json',
    withCredentials: true,
};

const client = axios.create({
    baseURL: 'http://localhost:8080', // 기본 URL 설정
    withCredentials: true, // withCredentials 설정
});

export async function getChatRoomList(userId: string): Promise<any> {
    const url: string = '/chat/room';
    return client.get(url, { params: { userId } }).then((result) => result);
}

export async function create(users: ChatRoomUsers): Promise<any> {
    const url: string = '/chat/room';
    return client.post(url, users, headers).then((result) => result);
}

export async function remove(users: ChatRoomUsers): Promise<any> {
    const url: string = '/chat/room';
    return client
        .delete(url, {
            data: {
                user_id: users.user_id,
                participant_user_id: users.participant_user_id,
            },
            headers,
        }) // 여기서 data 옵션 사용
        .then((result) => result);
}

export async function update(updatechat: UpdateChatTitle): Promise<any> {
    const url: string = '/chat/room';
    return client.put(url, updatechat, headers).then((result) => result);
}
