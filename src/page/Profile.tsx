import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { AiOutlineUser } from 'react-icons/ai';
import { BiSolidPencil } from 'react-icons/bi';

import { Container, Content } from '../theme/theme';
import { SignUp } from '../type/auth';
import { useGetUser, useUserMutations } from '../hooks/user';
import { userAtom } from '../recoil/authAtom';
import { User } from '../type/diary';

const formData = new FormData();
const nickRegex: RegExp = /^(?:[aeiouAEIOUㄱ-ㅎㅏ-ㅣ]*[a-zA-Z가-힣0-9])*$/;

export function Profile() {
    const user = useRecoilValue(userAtom);
    const { data } = useGetUser(user!);
    const [userInfo, setUserInfo] = useState<User>();
    const [editingNickname, setEditingNickname] = useState(false);
    const [editingIntroduction, setEditingIntroduction] = useState(false);
    const [newUserInfo, setNewUserInfo] = useState({
        nickname: '',
        introduction: '',
    });

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        data && setUserInfo(data.data);
    }, [data]);

    useEffect(() => {
        if (userInfo) {
            setNewUserInfo({
                nickname: userInfo?.nickname,
                introduction: userInfo?.introduction || '',
            });
        }
    }, [userInfo]);

    useEffect(() => {
        if (textareaRef.current) {
            // 기본 높이를 설정하고 스크롤을 제거합니다.
            textareaRef.current.style.height = 'auto';

            // 스크롤이 필요한 높이를 계산합니다.
            const scrollHeight = textareaRef.current.scrollHeight;

            // 높이를 설정합니다.
            textareaRef.current.style.height = scrollHeight + 'px';
        }
    }, [editingIntroduction]);

    const { updateUserHook } = useUserMutations();

    const [avatar, setAvatar] = useState<File>();
    const [signup, setSignup] = useState<SignUp>({
        user_id: '',
        password: '',
        nickname: '',
        email: '',
        birthday: '',
    });
    const [passwordCheck, setPasswordCheck] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];

        // 이미지 업로드 전에 초기화
        formData.delete('profile-image');
        formData.delete('user');

        file && formData.append('profile-image', file);
        file && setAvatar(file);

        formData.append('user', JSON.stringify(userInfo));

        console.log('이미지파일', file);

        updateUserHook.mutate(formData, {
            onSuccess(data, variables, context) {},
            onError(error, variables, context) {},
        });
    };

    const handleNicknameEdit = () => {
        setEditingNickname(true);
    };
    const handleIntroductionEdit = () => {
        setEditingIntroduction(true);
    };

    const handleUserInfoChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        e.preventDefault();

        const name = e.target.name;
        setNewUserInfo((prev) => ({ ...prev, [name]: e.target.value }));
    };

    const handlePasswordUpdate = () => {
        const pw = prompt('비밀번호를 입력해주세요');
    };

    const handleUserInfoSave = () => {
        userInfo!.nickname = newUserInfo.nickname;
        userInfo!.introduction = newUserInfo.introduction;

        if (!nickRegex.test(userInfo!.nickname)) {
            alert('닉네임은 한글, 영어, 숫자만 가능합니다.');
            return;
        }

        // 이미지 업로드 전에 초기화
        formData.delete('profile-image');
        formData.delete('user');

        formData.append('user', JSON.stringify(userInfo));

        updateUserHook.mutate(formData, {
            onSuccess(data, variables, context) {},
            onError(error, variables, context) {},
        });

        setEditingNickname(false);
        setEditingIntroduction(false);
    };

    return (
        <Container>
            <Content $maxWidth='1000px'>
                <UserInfoBox>
                    {userInfo && (
                        <div className='userinfo_container'>
                            <div className='userinfo_box'>
                                <label htmlFor='avatar-input'>
                                    {userInfo.profile_img ? (
                                        <Avatar src={userInfo.profile_img} />
                                    ) : (
                                        <AiOutlineUser className='no-profile' />
                                    )}
                                </label>
                                <input
                                    id='avatar-input'
                                    type='file'
                                    accept='image/*'
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }} // 실제로 표시되지 않도록 설정
                                />

                                <div className='right_box'>
                                    <div className='nickname_box'>
                                        {editingNickname ? (
                                            <>
                                                <input
                                                    type='text'
                                                    name='nickname'
                                                    value={newUserInfo.nickname}
                                                    onChange={
                                                        handleUserInfoChange
                                                    }
                                                />
                                                <button
                                                    onClick={handleUserInfoSave}
                                                >
                                                    저장
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <p className='nickname'>
                                                    {userInfo.nickname}
                                                </p>
                                                {userInfo.user_id === user && (
                                                    <>
                                                        <BiSolidPencil
                                                            className='pen'
                                                            onClick={
                                                                handleNicknameEdit
                                                            }
                                                        />
                                                        <p
                                                            className='password_update'
                                                            onClick={
                                                                handlePasswordUpdate
                                                            }
                                                        >
                                                            비밀번호 변경
                                                        </p>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>
                                    <p>
                                        가입날짜
                                        {` ${
                                            userInfo.create_date.split(' ')[0]
                                        }`}
                                    </p>
                                    <p>팔로우</p>
                                    <p>팔로잉</p>
                                </div>
                            </div>
                            <div className='introduction_box'>
                                <div className='title_box'>
                                    <span className='title'>자기 소개</span>
                                    {userInfo.user_id === user && (
                                        <BiSolidPencil
                                            className='pen'
                                            onClick={handleIntroductionEdit}
                                        />
                                    )}
                                </div>
                                {editingIntroduction ? (
                                    <>
                                        <textarea
                                            ref={textareaRef}
                                            name='introduction'
                                            value={newUserInfo.introduction}
                                            maxLength={2000}
                                            onChange={handleUserInfoChange}
                                        />
                                        <button onClick={handleUserInfoSave}>
                                            저장
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {userInfo.introduction ? (
                                            <p className='content'>
                                                {userInfo.introduction
                                                    .split('\n')
                                                    .map((line, index) => (
                                                        <React.Fragment
                                                            key={index}
                                                        >
                                                            {line}
                                                            <br />
                                                        </React.Fragment>
                                                    ))}
                                            </p>
                                        ) : (
                                            <p className='content_not'>
                                                소개글이 없습니다
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </UserInfoBox>
            </Content>
        </Container>
    );
}

const UserInfoBox = styled.div`
    width: 100%;

    .no-profile {
        font-size: 3.5rem;
        margin-right: 1rem;
    }

    .userinfo_container {
        width: 100%;
    }

    .userinfo_container .userinfo_box {
        display: flex;
        align-items: center;
        padding-bottom: 2rem;
        border-bottom: 1px solid ${(props) => props.theme.colors.line};
    }

    .userinfo_container .userinfo_box .right_box {
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
    }

    .userinfo_container .userinfo_box .right_box .nickname_box {
        display: flex;
    }

    .userinfo_container .userinfo_box .right_box .nickname_box p {
        margin-right: 0.5rem;
    }

    .userinfo_container .userinfo_box .right_box .nickname_box .nickname {
        font-size: 1rem;
    }

    .userinfo_container .userinfo_box .right_box .nickname_box .pen {
        cursor: pointer;
        margin-right: 0.5rem;
    }

    .userinfo_container
        .userinfo_box
        .right_box
        .nickname_box
        .password_update {
        cursor: pointer;
        color: ${(props) => props.theme.colors.red};
    }

    .userinfo_container .userinfo_box .right_box .nickname_box input {
    }
    .userinfo_container .userinfo_box .right_box .nickname_box button {
        padding: 0.5rem 1rem;
        background-color: ${(props) => props.theme.colors.signature};
        color: white;
        border: none;
        border-radius: 4px;
        font-weight: bold;
        cursor: pointer;
        margin-left: 0.2rem;
    }

    .userinfo_container .introduction_box {
        width: 100%;
        margin-top: 2rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid ${(props) => props.theme.colors.line};
    }

    .userinfo_container .introduction_box .title_box {
        display: flex;
        align-items: center;
        padding-bottom: 1rem;
    }
    .userinfo_container .introduction_box .title {
        margin-right: 0.5rem;
    }

    .userinfo_container .introduction_box .content {
        padding: 1rem;
        border-radius: 0.3rem;
        background-color: ${(props) => props.theme.colors.sky};
    }

    .userinfo_container .introduction_box textarea {
        width: 100%;
        padding: 1rem;
        border-radius: 0.3rem;
        background-color: ${(props) => props.theme.colors.sky};
        resize: vertical; // textarea의 높이 조절 방향을 수직으로 지정합니다.
    }
`;

const Avatar = styled.img`
    width: 8rem;
    height: 8rem;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 1rem;
`;
