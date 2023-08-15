export type Login = {
    user_id: string;
    password: string;
};

export type SignUp = Login & {
    nickname: string;
    email: string;
    birthday: string;
    introduction?: string;
    profile_img?: string;
};
