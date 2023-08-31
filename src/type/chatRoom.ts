export type GetChatRoomList = {
    room_id: number;
    room_name: string;
    create_date: string;
    participant_user_id: string;
    participant_nickname: string;
    profile_img: string;
    chat_id: number;
    message: string;
    message_date: string;
    unread_count: number;
};

export type ChatRoomUsers = {
    user_id: string;
    participant_user_id: string;
};

export type UpdateChatTitle = {
    user_id: string;
    participant_user_id: string;
    title: string;
};
