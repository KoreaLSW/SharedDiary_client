import React, { useEffect, useState } from 'react';
import { BsCloudRain, BsCloudSnow, BsCloudy, BsSun } from 'react-icons/bs';
type EmojiType = {
    text: string;
    emoji: JSX.Element;
};

type Props = {
    type: number;
};

export function WeatherEmoji({ type }: Props) {
    const [weather, setWeather] = useState<EmojiType>();

    useEffect(() => {
        switch (type) {
            case 1:
                setWeather({ text: '맑음', emoji: <BsSun /> });
                break;
            case 2:
                setWeather({ text: '흐림', emoji: <BsCloudy /> });
                break;
            case 3:
                setWeather({ text: '비', emoji: <BsCloudRain /> });
                break;
            case 4:
                setWeather({ text: '눈', emoji: <BsCloudSnow /> });
                break;
            default:
                setWeather({ text: '눈', emoji: <BsCloudSnow /> });
        }
    }, []);

    return (
        <div>
            {weather && (
                <div>
                    {weather.emoji}
                    <span>{weather.text}</span>
                </div>
            )}
        </div>
    );
}
