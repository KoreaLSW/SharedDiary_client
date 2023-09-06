import axios from 'axios';
import { ChatRoomUsers, UpdateChatTitle } from '../type/chatRoom';
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

export async function getChatRoomList(userId: string): Promise<any> {
    console.log('useGetChatRoomList!!');
    const url: string = '/chat/room';
    return http.client
        .get(url, { params: { userId } })
        .then((result) => result);
}

export async function create(users: ChatRoomUsers): Promise<any> {
    const url: string = '/chat/room';
    return http.client.post(url, users, headers).then((result) => result);
}

export async function remove(users: ChatRoomUsers): Promise<any> {
    const url: string = '/chat/room';
    console.log('채팅 리무브,', users);

    return http.client
        .delete(url, {
            params: {
                user_id: users.user_id,
                participant_user_id: users.participant_user_id,
            },
            headers,
        }) // 여기서 data 옵션 사용
        .then((result) => result);
}

export async function update(updatechat: UpdateChatTitle): Promise<any> {
    const url: string = '/chat/room';
    return http.client.put(url, updatechat, headers).then((result) => result);
}
