import React, { useState } from 'react';
import styled from 'styled-components';

interface DayProps {
    $isToday: boolean;
}

export function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const today = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const handleDayClick = (year: number, month: number, day: number) => {
        const formattedMonth = (month + 1).toString().padStart(2, '0'); // 월 포맷 변경
        const formattedDay = day.toString().padStart(2, '0'); // 날짜 포맷 변경
        console.log(`Clicked on ${year}-${formattedMonth}-${formattedDay}`);
        // 클릭한 날짜 처리 로직을 추가하면 됩니다.
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth - 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth + 1));
    };

    const goToToday = () => {
        const today = new Date();
        setCurrentDate(today);
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
                <PrevDay key={`empty-prev-${i}`} $isToday={false}>
                    {prevMonthLastDate - i}
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

            // Day 컴포넌트를 생성하고 날짜를 표시합니다.
            days.push(
                <Day
                    key={`day-${i}`}
                    $isToday={isToday}
                    onClick={() => handleDayClick(currentYear, currentMonth, i)} // 년, 월, 일 정보를 전달
                >
                    {i}
                </Day>
            );
        }

        return days; // 날짜 컴포넌트들을 담은 배열을 반환합니다.
    };

    return (
        <Container>
            <Header>
                <button onClick={prevMonth}>&lt;</button>
                <h1>
                    {currentDate.toLocaleString('default', {
                        year: 'numeric',
                        month: 'long',
                    })}
                </h1>
                <button onClick={nextMonth}>&gt;</button>
                <button onClick={goToToday}>오늘</button>{' '}
                {/* 오늘로 이동하는 버튼 추가 */}
            </Header>
            <DaysOfWeek>
                {daysOfWeek.map((day) => (
                    <Day key={day} $isToday={false}>
                        {day}
                    </Day>
                ))}
            </DaysOfWeek>
            <DayContainer>{renderDays()}</DayContainer>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    margin: 0 auto;
    border: 1px solid #ccc;
    margin-top: 2rem;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f2f2f2;
`;

const DaysOfWeek = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    background-color: #f7f7f7;
`;

const DayContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
`;

const PrevDay = styled.div<DayProps>`
    display: inline-grid;
    justify-items: center;
    align-items: center;
    padding: 10px;
    border: 1px solid #ccc;
    background-color: ${(props) =>
        props.$isToday ? props.theme.colors.sky : 'white'};
    height: 40px;
    color: ${(props) => props.theme.colors.skyText};
`;

const Day = styled.div<DayProps>`
    display: inline-grid;
    justify-items: center;
    align-items: center;
    padding: 10px;
    border: 1px solid #ccc;
    background-color: ${(props) =>
        props.$isToday ? props.theme.colors.sky : 'white'};
    height: 40px;

    &:hover {
        background-color: ${(props) => props.theme.colors.sky};
    }
`;
