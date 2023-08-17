export type CreateComments = {
    diary_id: string;
    user_id: string;
    contents: string;
};

export type RemoveComments = {
    comment_id: string;
    user_id: string;
};

export type GetComment = {
    user_id: string;
    profile_img: string;
    nickname: string;
    comment_id: string;
    diary_id: string;
    contents: string;
    create_date: string;
    like_check: number;
    like_count: number;
};
