import { styled } from 'styled-components';
import { useEffect, useState } from 'react';

import { HomeMenuItem } from '../component/HomeMenuItem';
import { useQuery } from 'react-query';
import { useDiaryUser } from '../hooks/diary';
import { GetDiary } from '../type/diary';
import { useRecoilValue } from 'recoil';
import { userAtom, userSelector } from '../recoil/authAtom';
import { Container, Content } from '../theme/theme';
import { Calendar } from '../component/Calendar';
import { useNavigate } from 'react-router-dom';

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
    const isLogin = useRecoilValue(userSelector);
    const navigate = useNavigate();

    const { data, isLoading, isError } = useDiaryUser(user);
    //console.log('data', data);
    console.log('Datauser', user);
    console.log('isLogin', isLogin);

    const [diary, setDiary] = useState<GetDiary[]>();

    const firstMenu = createMenu('내가 쓴 글', 0, 'first');
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

    try {
        useEffect(() => {
            data && setDiary(data.data);
        }, [data, user]);
    } catch (err) {
        console.log('data: ', err);
    }
    useEffect(() => {
        if (diary && data) {
            firstMenu.score = diary.length;
        }
    }, [diary, data]);

    // useEffect(() => {
    //     if (!isLogin) {
    //         navigate('/login');
    //     }
    // }, []);

    if (isLoading) {
        return <div>로딩중...</div>;
    }

    return (
        <Container>
            <Content $maxWidth='1000px'>
                <Menu>
                    {diary && <HomeMenuItem info={firstMenu} />}
                    <HomeMenuItem info={secondMenu} />
                    <HomeMenuItem info={thirdMenu} />
                </Menu>
                <Calendar />
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
