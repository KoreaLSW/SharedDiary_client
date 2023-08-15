import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { Navbar } from '../component/Navbar';
import { me } from '../api/auth';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '../recoil/authAtom';
import { useMe } from '../hooks/auth';

export function Main() {
    const setUser = useSetRecoilState(userAtom);

    const { data, isLoading, isError } = useMe();

    useEffect(() => {
        data && setUser(data.data.id);
        console.log('me', data);
    }, [data]);

    console.log('isLoading', isLoading);

    if (isError) {
        console.log('err', isError);
    }

    // useEffect(() => {
    //     async function fetchAndSetUser() {
    //         const user = await me()
    //             .then()
    //             .catch((err) => {
    //                 console.log('err', err);
    //             });
    //         console.log('me', user);

    //         user && setUser(user.data.id);
    //     }

    //     fetchAndSetUser();
    // }, [setUser]);

    if (isLoading) {
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
