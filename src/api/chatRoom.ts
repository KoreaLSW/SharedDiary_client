import axios from 'axios';
import { ChatRoomUsers, UpdateChatTitle } from '../type/chatRoom';
import HttpClient from '../network/http';

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
    return http.client.post(url, users).then((result) => result);
}

export async function remove(users: ChatRoomUsers): Promise<any> {
    const url: string = '/chat/room';
    return http.client
        .delete(url, {
            data: {
                user_id: users.user_id,
                participant_user_id: users.participant_user_id,
            },
        }) // 여기서 data 옵션 사용
        .then((result) => result);
}

export async function update(updatechat: UpdateChatTitle): Promise<any> {
    const url: string = '/chat/room';
    return http.client.put(url, updatechat).then((result) => result);
}
