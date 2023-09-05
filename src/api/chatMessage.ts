import axios from 'axios';
import { SelectMessage, sendMessage } from '../type/chatMessage';

const headers = {
    'Content-Type': 'application/json',
    withCredentials: true,
};

const client = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL, // 기본 URL 설정
    withCredentials: true, // withCredentials 설정
});

export async function getChatMessageList(
    selectMessage: SelectMessage
): Promise<any> {
    const url: string = '/chat/message';
    return client
        .get(url, { params: { selectMessage } })
        .then((result) => result);
}

export async function sendChatMessage(send: sendMessage): Promise<any> {
    const url: string = '/chat/message';
    return client.post(url, send, headers).then((result) => result);
}
