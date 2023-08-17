export type User = {
    user_id: string;
    password: string;
    nickname: string;
    email: string;
    birthday: string;
    create_date: string;
    introduction: string | null;
    profile_img: string | null;
};

export type SetDiary = {
    diary_id: number;
    user_id: string;
    create_date: string;
    dreate_date: string;
    contents: string;
    share_type: number;
    weather: number;
    emotion: number;
    image_01: string | null;
    image_02: string | null;
    image_03: string | null;
    image_04: string | null;
    image_05: string | null;
};

export type GetDiary = {
    user_id: string;
    nickname: string;
    profile_img: string | null;
    diary_id: number;
    create_date: string;
    dreate_date: string;
    contents: string;
    share_type: number;
    weather: number;
    emotion: number;
    image_01: string | null;
    image_02: string | null;
    image_03: string | null;
    image_04: string | null;
    image_05: string | null;
    like_count: number;
    like_check: number;
    comment_count: number;
};
