import axios from 'axios';
import { SelectMessage, sendMessage } from '../type/chatMessage';
import HttpClient from '../network/http';

const http = new HttpClient(process.env.REACT_APP_BASE_URL!);

export async function getChatMessageList(
    selectMessage: SelectMessage
): Promise<any> {
    const url: string = '/chat/message';
    return http.client
        .get(url, { params: { selectMessage } })
        .then((result) => result);
}

export async function sendChatMessage(send: sendMessage): Promise<any> {
    const url: string = '/chat/message';
    return http.client.post(url, send).then((result) => result);
}
