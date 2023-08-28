import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { AiOutlineSmile } from 'react-icons/ai';
import {
    BsCloudRain,
    BsCloudSnow,
    BsCloudy,
    BsEmojiAngry,
    BsFillTicketPerforatedFill,
    BsSun,
} from 'react-icons/bs';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import { RiEmotionNormalLine } from 'react-icons/ri';
import { TbMoodHeart } from 'react-icons/tb';
import { FaRegSadCry } from 'react-icons/fa';

import { dateAtome } from '../recoil/authAtom';
import { GetDiary } from '../type/diary';
import { WeatherEmoji } from './WeatherEmoji';
import { EmotionEmoji } from './EmotionEmoji';

type EmojiType = {
    text: string;
    emoji: JSX.Element;
};

type DayProps = {
    $isToday: boolean;
    $isSunday: boolean; // 일요일 여부를 나타내는 프롭 추가
};

type Props = {
    info?: GetDiary[];
    toggleModal: (date: string) => void;
};

export function Calendar({ info, toggleModal }: Props) {
    const [date, setDate] = useRecoilState(dateAtome);

    console.log('info', info);

    const today = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    const currentDay = date.getDate();

    const daysOfWeek = ['Sun', 'Mon', 'Thu', 'Wed', 'Tue', 'Fri', 'Sat'];
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const handleDayClick = (year: number, month: number, day: number) => {
        const formattedMonth = (month + 1).toString().padStart(2, '0'); // 월 포맷 변경
        const formattedDay = day.toString().padStart(2, '0'); // 날짜 포맷 변경
        const date = `${year}-${formattedMonth}-${formattedDay}`;
        toggleModal(date);
    };

    const prevMonth = () => {
        setDate(new Date(currentYear, currentMonth - 1));
    };

    const nextMonth = () => {
        setDate(new Date(currentYear, currentMonth + 1));
    };

    const goToToday = () => {
        setDate(today);
    };

    const renderDays = () => {
        const days = [];

        // 이전 달의 마지막 일부터 빈 날짜들을 추가합니다.
        const prevMonthLastDate = new Date(
            currentYear,
            currentMonth,
            0
        ).getDate();
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            days.push(
                <PrevDay
                    key={`empty-prev-${i}`}
                    $isToday={false}
                    $isSunday={false}
                >
                    <p>{prevMonthLastDate - i}</p>
                </PrevDay>
            );
        }

        // 현재 달의 날짜들을 추가합니다.
        for (let i = 1; i <= daysInMonth; i++) {
            // 오늘 날짜인지 확인합니다.
            const isToday =
                currentYear === today.getFullYear() &&
                currentMonth === today.getMonth() &&
                i === today.getDate();

            // 일요일 여부 판단
            const isSunday = (firstDayOfMonth + i - 1) % 7 === 0;

            // 현재 날짜와 일기 쓴 날짜가 같은지 구별하기 위한 값
            const day = `${currentYear}-${(1 + currentMonth)
                .toString()
                .padStart(2, '0')}-${i.toString().padStart(2, '0')}`;

            // 같은날짜에 2개이상 글이 있을때 중복을 제거 하기 위한 Set
            const uniqueDates = new Set();

            // Day 컴포넌트를 생성하고 날짜를 표시합니다.
            days.push(
                <Day
                    key={`day-${i}`}
                    $isToday={isToday}
                    $isSunday={isSunday} // 일요일 여부를 전달
                    onClick={() => handleDayClick(currentYear, currentMonth, i)}
                >
                    <p>{i}</p>
                    {info &&
                        info.map((item: GetDiary, index) => {
                            if (
                                day === item.diary_date &&
                                !uniqueDates.has(day)
                            ) {
                                uniqueDates.add(day); // Set에 추가
                                return (
                                    <div className='day_emoji' key={index}>
                                        <WeatherEmoji type={item.weather} />
                                        <EmotionEmoji type={item.emotion} />
                                    </div>
                                );
                            }
                            return null;
                        })}
                </Day>
            );
        }

        return days; // 날짜 컴포넌트들을 담은 배열을 반환합니다.
    };

    return (
        <Container>
            <Header>
                <h1>
                    {date.toLocaleString('default', {
                        year: 'numeric',
                        month: 'long',
                    })}
                </h1>
                <div>
                    <button onClick={prevMonth}>&lt;</button>
                    <button className='today' onClick={goToToday}>
                        Today
                    </button>
                    <button onClick={nextMonth}>&gt;</button>
                </div>
            </Header>
            <DaysOfWeek>
                {daysOfWeek.map((day) => (
                    <Week key={day} $isToday={false} $isSunday={false}>
                        {day}
                    </Week>
                ))}
            </DaysOfWeek>
            <DayContainer>{renderDays()}</DayContainer>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    margin: 0 auto;
    margin-top: 2rem;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;

    h1 {
        font-size: 0.7rem;
    }

    button {
        border: 0;
        background-color: transparent;
        font-weight: bold;
        cursor: pointer;
        font-size: 0.5rem;
    }

    .today {
        margin: 0 1rem;
    }
`;

const DaysOfWeek = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-size: 0.5rem;
    background-color: ${(props) => props.theme.colors.sky};
`;

const Week = styled.div<DayProps>`
    display: inline-grid;
    justify-items: center;
    align-items: center;
    padding: 0.5rem 2rem;
    border: 1px solid ${(props) => props.theme.colors.line};
`;

const DayContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
`;

const PrevDay = styled.div<DayProps>`
    height: 5rem;
    position: relative;
    display: inline-grid;
    justify-items: center;
    align-items: center;
    border: 1px solid ${(props) => props.theme.colors.line};
    background-color: ${(props) =>
        props.$isToday ? props.theme.colors.sky : 'white'};
    color: ${(props) => props.theme.colors.skyText};

    p {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        font-size: 0.5rem;
    }
`;

const Day = styled.div<DayProps>`
    height: 5rem;
    position: relative;
    display: inline-grid;
    justify-items: center;
    align-items: center;
    border: 1px solid
        ${(props) =>
            props.$isToday ? props.theme.colors.red : props.theme.colors.line};
    font-weight: bold;
    color: ${(props) =>
        props.$isToday || props.$isSunday ? props.theme.colors.red : 'black'};

    &:hover {
        background-color: ${(props) => props.theme.colors.sky};
    }

    p {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        font-size: 0.5rem;
        color: ${(props) => (props.$isSunday ? 'red' : 'inherit')};
    }

    .day_emoji {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
    }

    .day_emoji div {
        display: flex;
        align-items: center;
        gap: 0.1rem;
    }

    .day_emoji span {
        font-size: 0.2rem;
        font-weight: 100;
    }
`;
