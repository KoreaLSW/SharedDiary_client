import { styled } from 'styled-components';
import { useEffect, useState, useMemo } from 'react';

import { useQuery } from 'react-query';
import { useDiaryMonth, useDiaryMonthHome, useDiaryUser } from '../hooks/diary';
import { GetDiary } from '../type/diary';
import { useRecoilValue } from 'recoil';
import {
    emotionAtom,
    dateAtome,
    userAtom,
    userSelector,
    weatherAtom,
} from '../recoil/authAtom';
import { Container, Content } from '../theme/theme';
import { Calendar } from '../component/Calendar';
import { useNavigate } from 'react-router-dom';
import { ModalWriteDiary } from '../component/ModalWritediary';
import { Loading } from '../component/Loading';
import { useGetFollower, useGetFollowing } from '../hooks/follow';

export function Home() {
    const user = useRecoilValue(userAtom);
    const date = useRecoilValue(dateAtome);
    const navigate = useNavigate();

    const [modalDate, setModalDate] = useState<string>('');
    const [diary, setDiary] = useState<GetDiary[]>();

    //const { data, isLoading, isError } = useDiaryUser(user);
    const {
        data: monthDiary,
        isLoading,
        isError,
    } = useDiaryMonthHome({
        user_id: user!,
        month: date.getMonth() + 1,
    });
    const { data: follower } = useGetFollower(user!);
    const { data: following } = useGetFollowing(user!);

    useEffect(() => {
        monthDiary && setDiary(monthDiary.data);
    }, [monthDiary]);

    //const [diary, setDiary] = useState<GetDiary[]>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = (date?: string) => {
        setIsModalOpen(!isModalOpen);
        date && setModalDate(date);
    };

    const handelMonthDiary = () => {
        navigate('/mysharediary');
    };

    const handleDayClick = () => {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth() + 1;
        const currentDay = today.getDate();

        const date = `${currentYear}-${String(currentMonth).padStart(
            2,
            '0'
        )}-${String(currentDay).padStart(2, '0')}`;

        toggleModal(date);
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Container>
            <Content $maxWidth='1000px'>
                <MenuContainer>
                    <MenuItem onClick={handelMonthDiary}>
                        <p>{date.getMonth() + 1}월의 글</p>
                        <p className='diary_count'>
                            {monthDiary && monthDiary.data.length}개
                        </p>
                    </MenuItem>
                    <MenuItemLine></MenuItemLine>
                    <MenuItem onClick={handleDayClick}>오늘 일기쓰기</MenuItem>
                    <MenuItemLine></MenuItemLine>
                    <MenuItem>
                        <div>
                            팔로우
                            <p>&nbsp;{follower && follower.data.length}명</p>
                        </div>
                        <div>
                            팔로잉
                            <p>&nbsp;{following && following.data.length}명</p>
                        </div>
                    </MenuItem>
                </MenuContainer>
                <Calendar
                    info={diary}
                    toggleModal={(date: string) => toggleModal(date)}
                />

                {isModalOpen && (
                    <ModalWriteDiary
                        modalDate={modalDate}
                        toggleModal={() => toggleModal()}
                    />
                )}
            </Content>
        </Container>
    );
}

const Menu = styled.ul`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const MenuContainer = styled.div`
    display: flex;
    align-items: center;
    background-color: #fafafa;
    border-radius: 7px;
`;

const MenuItem = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #f0f0f0;
    }

    p {
        font-size: 1rem;
        color: black;
    }

    .diary_count {
        color: ${(props) => props.theme.colors.signature};
        font-weight: bold;
    }

    div {
        display: flex;
    }

    div p {
        font-weight: bold;
        color: ${(props) => props.theme.colors.signature};
    }
`;

const MenuItemLine = styled.div`
    width: 1px;
    height: 70%;
    background-color: ${(props) => props.theme.colors.line};
`;
