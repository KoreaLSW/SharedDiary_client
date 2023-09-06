import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import socket from 'socket.io-client';

import { Navbar } from '../component/Navbar';
import { me } from '../api/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
    emotionAtom,
    socketAtome,
    userAtom,
    weatherAtom,
} from '../recoil/authAtom';
import { useMe, useType } from '../hooks/auth';
import { Loading } from '../component/Loading';

export function Main() {
    const [user, setUser] = useRecoilState(userAtom);
    const setSocket = useSetRecoilState(socketAtome);
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
    //     if (userData) {
    //         const socketIO = socket(process.env.REACT_APP_BASE_URL!, {
    //             query: { user: userData.data.id }, // 사용자 ID를 서버로 전달
    //         });

    //         setSocket(socketIO);
    //     }
    // }, [userData]);

    // useEffect(() => {
    //     if (userError || weatherError || emotionError) {
    //         setIsMeLoading(false);
    //     }
    // }, [userError, weatherError, emotionError]);

    if (isMeLoading) {
        return <Loading />;
    } else {
        return (
            <div style={{ display: 'flex', height: '100vh' }}>
                <Navbar />
                <Outlet />
            </div>
        );
    }
}
