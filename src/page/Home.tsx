import { styled } from 'styled-components';
import { useEffect, useState, useMemo } from 'react';

import { HomeMenuItem } from '../component/HomeMenuItem';
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
import { Loding } from '../component/Loding';

export type HomeMenuUnion = 'first' | 'second' | 'third';

export type Follow<T> = {
    follower: T;
    following: T;
};

export type HomeMenuItems<T, R> = {
    name: T;
    score: R;
    type: HomeMenuUnion;
};

export function Home() {
    const user = useRecoilValue(userAtom);
    const date = useRecoilValue(dateAtome);

    const [modalDate, setModalDate] = useState<string>('');
    const [diary, setDiary] = useState<GetDiary[]>();

    //const { data, isLoading, isError } = useDiaryUser(user);
    const { data, isLoading, isError } = useDiaryMonthHome({
        user_id: user!,
        month: date.getMonth() + 1,
    });

    useEffect(() => {
        data && setDiary(data.data);
    }, [data]);

    //const [diary, setDiary] = useState<GetDiary[]>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [first, setFirst] = useState<
        HomeMenuItems<string, number | undefined>
    >({
        name: `${date.getMonth() + 1}월에 내가 쓴 글`,
        score: undefined,
        type: 'first',
    });
    const secondMenu = createMenu('글쓰기', 0, 'second');
    const thirdMenu = createMenu(
        {
            follower: '팔로우',
            following: '팔로잉',
        },
        {
            follower: 0,
            following: 0,
        },
        'third'
    );

    useEffect(() => {
        if (data) {
            first.score = data.data.length;
            setFirst({
                ...first,
                name: `${date.getMonth() + 1}월에 쓴 글`,
                score: data.data.length,
            });
            console.log('useEffect', first.score);
        }
    }, [data]);

    const toggleModal = (date?: string) => {
        setIsModalOpen(!isModalOpen);
        date && setModalDate(date);
    };

    if (isLoading) {
        return <Loding />;
    }

    return (
        <Container>
            <Content $maxWidth='1000px'>
                <Menu>
                    {data && <HomeMenuItem info={first} />}
                    <HomeMenuItem info={secondMenu} />
                    <HomeMenuItem info={thirdMenu} />
                </Menu>
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

function createMenu<T, R>(
    name: T,
    score: R,
    type: HomeMenuUnion
): HomeMenuItems<T, R> {
    const menu: HomeMenuItems<T, R> = {
        name,
        score,
        type: type,
    };
    return menu;
}
