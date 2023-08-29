import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Navbar } from '../component/Navbar';
import { me } from '../api/auth';
import { useSetRecoilState } from 'recoil';
import { emotionAtom, userAtom, weatherAtom } from '../recoil/authAtom';
import { useMe, useType } from '../hooks/auth';

export function Main() {
    const setUser = useSetRecoilState(userAtom);
    const setWeather = useSetRecoilState(weatherAtom);
    const setEmotion = useSetRecoilState(emotionAtom);
    const [isMeLoading, setIsMeLoading] = useState(true); // 로딩 상태 관리

    const { pathname } = useLocation();

    // 페이지 이동시 스크롤 맨위로 고정
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const {
        data: userData,
        isLoading: userLoading,
        isError: userError,
    } = useMe();

    const {
        data: weatherData,
        isLoading: weatherLoading,
        isError: weatherError,
    } = useType('weather');

    const {
        data: emotionData,
        isLoading: emotionLoading,
        isError: emotionError,
    } = useType('emotion');

    useEffect(() => {
        if (userData && weatherData && emotionData) {
            setUser(userData.data.id);
            //setWeather(weatherData.data);
            //setEmotion(emotionData.data);
        }
    }, [userData, weatherData, emotionData]);

    useEffect(() => {
        if (!userLoading && !weatherLoading && !emotionLoading) {
            setIsMeLoading(false);
        }
    }, [userLoading, weatherLoading, emotionLoading]);

    // useEffect(() => {
    //     if (userError || weatherError || emotionError) {
    //         setIsMeLoading(false);
    //     }
    // }, [userError, weatherError, emotionError]);

    if (isMeLoading) {
        return <div>로딩중.....</div>;
    } else {
        return (
            <div style={{ display: 'flex', height: '100vh' }}>
                <Navbar />
                <Outlet />
            </div>
        );
    }
}
