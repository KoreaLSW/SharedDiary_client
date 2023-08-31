export type SelectMessage = {
    room_id: string;
    user_id: string;
    participant_user_id: string;
};

export type sendMessage = {
    user_id: string;
    participant_user_id: string;
    message: string;
};

export type GetMessage = {
    chat_id: number;
    message_date: string;
    user_id: string;
    nickname: string;
    message: string;
    profile_img: string;
    message_status: 'Read' | 'Unread';
};
