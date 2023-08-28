import React, { useEffect, useState } from 'react';
import { AiOutlineSmile } from 'react-icons/ai';
import { BsEmojiAngry } from 'react-icons/bs';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import { RiEmotionNormalLine } from 'react-icons/ri';
import { TbMoodHeart } from 'react-icons/tb';
import { FaRegSadCry } from 'react-icons/fa';
import { ImSleepy } from 'react-icons/im';

type EmojiType = {
    text: string;
    emoji: JSX.Element;
};

type Props = {
    type: number;
};

export function EmotionEmoji({ type }: Props) {
    const [emotion, setEmotion] = useState<EmojiType>();

    useEffect(() => {
        switch (type) {
            case 1:
                setEmotion({
                    text: '행복',
                    emoji: <HiOutlineEmojiHappy />,
                });
                break;
            case 2:
                setEmotion({
                    text: '신남',
                    emoji: <AiOutlineSmile />,
                });
                break;
            case 3:
                setEmotion({
                    text: '설렘',
                    emoji: <TbMoodHeart />,
                });
                break;
            case 4:
                setEmotion({
                    text: '보통',
                    emoji: <RiEmotionNormalLine />,
                });
                break;
            case 5:
                setEmotion({
                    text: '피곤',
                    emoji: <ImSleepy />,
                });
                break;
            case 6:
                setEmotion({
                    text: '슬픔',
                    emoji: <FaRegSadCry />,
                });
                break;
            case 7:
                setEmotion({
                    text: '화남',
                    emoji: <BsEmojiAngry />,
                });
                break;
            default:
                setEmotion({
                    text: '화남',
                    emoji: <BsEmojiAngry />,
                });
        }
    }, []);
    return (
        <div>
            {emotion && (
                <div>
                    {emotion.emoji}
                    <span>{emotion.text}</span>
                </div>
            )}
        </div>
    );
}
