export type WeatherType = {
    weather_id: number; // 날씨 아이디
    weather_text: string; // 날씨 텍스트
};

export type EmotionType = {
    emotion_id: number; // 감정 아이디
    emotion_text: string; // 감정 텍스트
};

export type ShareType = {
    share_id: number; // 공유 아이디
    share_text: string; // 공유 텍스트
};

export type SelectOption = {
    option_id: number;
    option_type: string;
};
