import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
    AiOutlineHome,
    AiFillHome,
    AiOutlineLogin,
    AiOutlineLogout,
} from 'react-icons/ai';
import { FaRegStickyNote, FaStickyNote } from 'react-icons/fa';
import { HiOutlineUser, HiUser } from 'react-icons/hi';
import { RiMessage3Line, RiMessage3Fill } from 'react-icons/ri';
import {
    BsFileEarmarkBarGraph,
    BsFileEarmarkBarGraphFill,
    BsPersonPlus,
    BsPersonPlusFill,
} from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { getLocal, setLocal } from '../localstorage/localstorage';
import { me } from '../api/auth';
import { userAtom } from '../recoil/authAtom';
import { useAuth } from '../hooks/auth';

type List = {
    icon: JSX.Element;
    clickicon: JSX.Element;
    text: JSX.Element;
    value: number;
    path: string;
};

const navbarArray: List[] = [
    {
        icon: <AiOutlineHome />,
        clickicon: <AiFillHome />,
        text: <span>홈</span>,
        value: 1,
        path: '/',
    },
    {
        icon: <FaRegStickyNote />,
        clickicon: <FaStickyNote />,
        text: <span>공유일기</span>,
        value: 2,
        path: '/shareDiary',
    },
    // {
    //     icon: <BsPersonPlus />,
    //     clickicon: <BsPersonPlusFill />,
    //     text: <span>팔로우</span>,
    //     value: 3,
    //     path: '/follow',
    // },
    {
        icon: <RiMessage3Line />,
        clickicon: <RiMessage3Fill />,
        text: <span>메세지</span>,
        value: 4,
        path: '/message',
    },
    // {
    //     icon: <BsFileEarmarkBarGraph />,
    //     clickicon: <BsFileEarmarkBarGraphFill />,
    //     text: <span>통계</span>,
    //     value: 5,
    //     path: '/statistics',
    // },
    {
        icon: <HiOutlineUser />,
        clickicon: <HiUser />,
        text: <span>프로필</span>,
        value: 6,
        path: '/profile',
    },
];
export function Navbar() {
    const user = useRecoilValue(userAtom);
    const navigate = useNavigate();
    const setUserAtom = useSetRecoilState(userAtom);
    const [id, setId] = useState<string>();

    const { logoutHook } = useAuth();

    const [btnActive, setBtnActive] = useState<number>(
        parseInt(getLocal('navbar'))
    );

    useEffect(() => {
        setId(user);
    }, [user]);

    const toggleActive = (item: List | undefined, i: number) => {
        //console.log(i);

        setBtnActive(() => {
            return i;
        });
        setLocal('navbar', i.toString());

        if (item) {
            if (!user) {
                navigate('/login');
                return;
            }
            item.value === 6
                ? navigate(`${item.path}/${user}`)
                : navigate(item.path);
        }
    };

    window.addEventListener('load', () => {
        setLocal('navbar', '0');
    });

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        logoutHook.mutate(undefined, {
            onSuccess(data, variables, context) {
                console.log('logoutSuccess data', data);
                console.log('logoutSuccess variables', variables);
                console.log('logoutSuccess context', context);

                setUserAtom('' as any);
                navigate('/login');
            },
            onError(error: any, variables, context) {
                console.log('logoutError', error);
                alert(error.response.data.message);
            },
        });
    };

    const navbarList: JSX.Element[] = navbarArray.map((item, index) => (
        <Li
            key={index}
            value={index}
            className={index === btnActive ? 'active' : ''}
            onClick={() => {
                toggleActive(item, index);
            }}
        >
            {index === btnActive ? item.clickicon : item.icon}
            {item.text}
        </Li>
    ));
    return (
        <Nav>
            <Logo>
                <p>SharedDiary</p>
            </Logo>
            <Ul>{navbarList}</Ul>
            <LoginBox className='abc'>
                {user ? (
                    <div className='logout' onClick={handleLogout}>
                        <AiOutlineLogout />
                        <p>Logout</p>
                    </div>
                ) : (
                    <Link
                        className={
                            'login' +
                            (btnActive === navbarArray.length + 1
                                ? ' loginClick'
                                : '')
                        }
                        to='/login'
                        onClick={() => {
                            toggleActive(undefined, navbarArray.length + 1);
                        }}
                    >
                        <AiOutlineLogin />
                        <p>Login</p>
                    </Link>
                )}
            </LoginBox>
        </Nav>
    );
}

const Nav = styled.div`
    width: 15%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid ${(props) => props.theme.colors.line};
    padding: 0 1rem;
    position: fixed;

    @media (max-width: 1024px) {
        width: 8rem;
    }

    @media (max-width: 768px) {
        width: 100vw;
        position: fixed;
        bottom: 0;
        height: 3rem;
        flex-direction: row;
        background-color: white;
        z-index: 999;
        border-top: 1px solid solid ${(props) => props.theme.colors.line};
        margin-right: none;
        margin: 0;
    }
`;

const Logo = styled.div`
    display: flex;
    justify-content: center;
    margin: 1rem 0;
    p {
        font-weight: bold;
    }

    @media (max-width: 768px) {
        display: none;
    }
`;

const Ul = styled.ul`
    width: 100%;

    @media (max-width: 1024px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 1.5rem;
        gap: 1rem;

        span {
            display: none;
        }
    }

    @media (max-width: 768px) {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        font-size: 1.5rem;
    }
`;

const Li = styled.li`
    display: flex;
    height: 3rem;
    align-items: center;
    list-style: none;
    margin-bottom: 1rem;
    cursor: pointer;
    padding: 0 0.5rem;
    color: ${(props) => props.theme.colors.grayText};
    &:hover {
        color: ${(props) => props.theme.colors.signature};
    }

    span {
        margin-left: 0.5rem;
    }

    &.active {
        border: 1px solid ${(props) => props.theme.colors.signature};
        border-radius: 0.5rem;
        color: ${(props) => props.theme.colors.signature};
        font-weight: bold;
        background-color: ${(props) => props.theme.colors.sky};
    }

    @media (max-width: 1024px) {
        &.active {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    @media (max-width: 768px) {
        margin: 0;
        padding: 0;
        background-color: none;

        &.active {
            width: auto;
            border: none;
            background-color: white;
        }
    }
`;

const LoginBox = styled.div`
    height: 100%;
    margin-bottom: 3rem;
    display: flex;
    align-items: end;
    p {
        margin-left: 1rem;
        font-size: 0.9rem;
        font-weight: bold;
    }
    .login {
        display: flex;
        color: #000000;
    }

    .login:hover {
        color: ${(props) => props.theme.colors.signature};
        cursor: pointer;
    }

    .loginClick {
        color: ${(props) => props.theme.colors.signature};
    }

    .logout {
        display: flex;
        color: ${(props) => props.theme.colors.red};
        cursor: pointer;
    }

    @media (max-width: 768px) {
        display: none;
        align-items: center;
        justify-content: center;
        padding: 0;
        margin: 0;
        p {
            display: none;
        }
    }
`;
