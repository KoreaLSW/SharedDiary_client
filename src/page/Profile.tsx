import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { BiSolidPencil } from 'react-icons/bi';
import { useParams } from 'react-router-dom';

import { Container, Content } from '../theme/theme';
import { SignUp } from '../type/auth';
import { useGetUser, useUserMutations } from '../hooks/user';
import { userAtom } from '../recoil/authAtom';
import { GetDiary, User } from '../type/diary';
import { PasswordModal } from '../component/PasswordUpdateModal';
import { useAuth } from '../hooks/auth';
import { useDiaryUser, useDiaryUserPage } from '../hooks/diary';
import { ProfileGiaryCard } from '../component/ProfileGiaryCard';
import {
    useFollowMutations,
    useGetFollowCheck,
    useGetFollower,
    useGetFollowing,
} from '../hooks/follow';
import { FollowModal } from '../component/FollowModal';

const formData = new FormData();
const nickRegex: RegExp = /^(?:[aeiouAEIOUㄱ-ㅎㅏ-ㅣ]*[a-zA-Z가-힣0-9])*$/;

export function Profile() {
    const user = useRecoilValue(userAtom);
    const { profileuser } = useParams();
    console.log('profileuser', profileuser);

    const { data: follower } = useGetFollower(profileuser!);
    const { data: following } = useGetFollowing(profileuser!);
    const { data: followCheck } = useGetFollowCheck({
        followerId: user!,
        followingId: profileuser!,
    });
    const { data: getUser } = useGetUser(profileuser!); // 유저정보
    const { data: getDiaryCount } = useDiaryUser(profileuser!); // 다이어리 총 갯수
    const {
        data: getDiary,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isError,
    } = useDiaryUserPage(profileuser); // 스크롤에 따라 다이어리 호출

    // follower && console.log('follower', follower);
    // following && console.log('following', following);
    // followCheck && console.log('followCheck', followCheck);

    const [userInfo, setUserInfo] = useState<User>();
    const [editingNickname, setEditingNickname] = useState(false);
    const [editingIntroduction, setEditingIntroduction] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [newUserInfo, setNewUserInfo] = useState({
        nickname: '',
        introduction: '',
    });

    const [isFollowerModal, setIsFollowerModal] = useState(false); // 팔로워 모달창 상태관리
    const [isFollowingModal, setIsFollowingModal] = useState(false); // 팔로우 모달창 상태관리

    const { updateHook } = useAuth();
    const { createFollow, removeFollow } = useFollowMutations();

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        getUser && setUserInfo(getUser.data);
    }, [getUser]);

    useEffect(() => {
        if (isPasswordModalOpen || isFollowerModal || isFollowingModal) {
            // 모달이 열렸을 때 스크롤 막기
            document.body.style.overflow = 'hidden';
        } else {
            // 모달이 닫혔을 때 스크롤 다시 활성화
            document.body.style.overflow = 'auto';
        }

        return () => {
            // 컴포넌트 언마운트될 때 스크롤 다시 활성화
            document.body.style.overflow = 'auto';
        };
    }, [isPasswordModalOpen, isFollowerModal, isFollowingModal]);

    useEffect(() => {
        if (userInfo) {
            setNewUserInfo({
                nickname: userInfo?.nickname,
                introduction: userInfo?.introduction || '',
            });
        }
    }, [userInfo]);

    // textarea 높이 조절
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

    const bottomBoundaryRef = useRef(null);

    // 스크롤이 제일 밑으로가면 데이터를 불러옴
    useEffect(() => {
        // Intersection Observer 인스턴스 생성
        const observer = new IntersectionObserver(
            (entries) => {
                // 관찰 대상 요소와 뷰포트가 교차하는 경우
                if (entries[0].isIntersecting && hasNextPage) {
                    // 다음 페이지 데이터를 로드하는 함수 호출
                    fetchNextPage();
                }
            },
            // 옵션 설정: 관찰 대상 요소가 아래로 10px 이하만큼 스크롤되면 교차로 판단
            { rootMargin: '10px' }
        );

        // bottomBoundaryRef가 유효한 경우에만 Observer 연결
        if (bottomBoundaryRef.current) {
            observer.observe(bottomBoundaryRef.current);
        }

        // 컴포넌트 언마운트 시 Observer 연결 해제
        return () => {
            if (bottomBoundaryRef.current) {
                observer.unobserve(bottomBoundaryRef.current);
            }
        };
    }, [bottomBoundaryRef, fetchNextPage, hasNextPage]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];

        // 이미지 업로드 전에 초기화
        formData.delete('profile-image');
        formData.delete('user');

        file && formData.append('profile-image', file);
        formData.append('user', JSON.stringify(userInfo));

        updateHook.mutate(formData, {
            onSuccess(data, variables, context) {
                alert('이미지 업로드 완료');
            },
            onError(error, variables, context) {
                alert(`이미지 업로드 실패 ${error}`);
            },
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

    // 패스워드 모달창
    const handlePasswordModal = () => {
        setIsPasswordModalOpen(true);
    };
    // 팔로워 모달창
    const handleFollowerModal = () => {
        setIsFollowerModal(true);
    };
    // 팔로우 모달창
    const handleFollowingModal = () => {
        setIsFollowingModal(true);
    };

    // 팔로우 하기
    const handleFollow = () => {
        createFollow.mutate(
            { followerId: user!, followingId: profileuser! },
            {
                onSuccess(data, variables, context) {},
                onError(error, variables, context) {},
            }
        );
    };

    // 팔로우 취소
    const handleUnfollow = () => {
        removeFollow.mutate(
            { followerId: user!, followingId: profileuser! },
            {
                onSuccess(data, variables, context) {},
                onError(error, variables, context) {},
            }
        );
    };

    // 수정사항 저장
    const handleUserInfoSave = () => {
        userInfo!.nickname = newUserInfo.nickname;
        userInfo!.introduction = newUserInfo.introduction;
        //userInfo!.password = password && password;

        if (!nickRegex.test(userInfo!.nickname)) {
            alert('닉네임은 한글, 영어, 숫자만 가능합니다.');
            return;
        }

        console.log('userInfo!', userInfo);

        // 이미지 업로드 전에 초기화
        formData.delete('profile-image');
        formData.delete('user');

        formData.append('user', JSON.stringify(userInfo));

        updateHook.mutate(formData, {
            onSuccess(data, variables, context) {
                alert('수정 완료');
            },
            onError(error, variables, context) {
                alert(`수정 실패 ${error}`);
            },
        });

        setEditingNickname(false);
        setEditingIntroduction(false);
    };

    const handlePasswordSubmit = (password: string) => {
        userInfo!.passwordUpdate = password && password;
        handleUserInfoSave();
    };

    return (
        <Container>
            <Content $maxWidth='1000px'>
                <UserInfoBox>
                    {userInfo && (
                        <div className='userinfo_container'>
                            <div className='userinfo_box'>
                                <label htmlFor='avatar-input'>
                                    <Avatar
                                        src={
                                            userInfo.profile_img
                                                ? userInfo.profile_img
                                                : 'https://dmemema.cafe24.com/img/noprofile/noprofile.jpg'
                                        }
                                    />
                                </label>
                                {user === profileuser && (
                                    <input
                                        id='avatar-input'
                                        type='file'
                                        accept='image/*'
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }} // 실제로 표시되지 않도록 설정
                                    />
                                )}

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
                                                {user === profileuser && (
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
                                                                handlePasswordModal
                                                            }
                                                        >
                                                            비밀번호 변경
                                                        </p>
                                                    </>
                                                )}
                                                {user !== profileuser &&
                                                    (followCheck &&
                                                    followCheck.data.length ===
                                                        0 ? (
                                                        <p
                                                            className='follow'
                                                            onClick={
                                                                handleFollow
                                                            }
                                                        >
                                                            팔로우
                                                        </p>
                                                    ) : (
                                                        <p
                                                            className='unfollow'
                                                            onClick={
                                                                handleUnfollow
                                                            }
                                                        >
                                                            팔로우 취소
                                                        </p>
                                                    ))}
                                            </>
                                        )}
                                    </div>
                                    <p>
                                        가입날짜
                                        {` ${
                                            userInfo.create_date.split(' ')[0]
                                        }`}
                                    </p>
                                    <div className='bottom'>
                                        <p>
                                            총 게시물{' '}
                                            <strong>
                                                {getDiaryCount
                                                    ? getDiaryCount.data.length
                                                    : 0}
                                            </strong>
                                        </p>
                                        <p
                                            className='follower'
                                            onClick={handleFollowerModal}
                                        >
                                            팔로워
                                            <strong>
                                                {' '}
                                                {follower
                                                    ? follower.data.length
                                                    : 0}
                                            </strong>
                                        </p>
                                        <p
                                            className='following'
                                            onClick={handleFollowingModal}
                                        >
                                            팔로우
                                            <strong>
                                                {' '}
                                                {following
                                                    ? following.data.length
                                                    : 0}
                                            </strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='introduction_box'>
                                <div className='title_box'>
                                    <span className='title'>자기 소개</span>
                                    {user === profileuser && (
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
                {isPasswordModalOpen && (
                    <PasswordModal
                        onClose={() => setIsPasswordModalOpen(false)}
                        onPasswordSubmit={handlePasswordSubmit}
                    />
                )}
                <GridViewContainer>
                    {getDiary?.pages.map((page, pageIndex) => (
                        <React.Fragment key={pageIndex}>
                            {page.data.data.map(
                                (info: GetDiary, index: number) => (
                                    <li key={index}>
                                        <ProfileGiaryCard info={info} />
                                    </li>
                                )
                            )}
                        </React.Fragment>
                    ))}
                </GridViewContainer>
                <div ref={bottomBoundaryRef}></div>
                {isLoading && <p>로딩 중...</p>}
                {isFollowingModal && following && (
                    <FollowModal
                        onClose={() => setIsFollowingModal(false)}
                        info={following.data}
                        title='팔로우'
                    />
                )}
                {isFollowerModal && follower && (
                    <FollowModal
                        onClose={() => setIsFollowerModal(false)}
                        info={follower.data}
                        title='팔로워'
                    />
                )}
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

    .userinfo_container .userinfo_box .right_box .bottom {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
    }

    .userinfo_container .userinfo_box .right_box .bottom p {
        background-color: ${(props) => props.theme.colors.sky};
        padding: 1rem;
        border-radius: 0.5rem;
    }

    .userinfo_container .userinfo_box .right_box .bottom .follower,
    .userinfo_container .userinfo_box .right_box .bottom .following {
        cursor: pointer;
    }

    .userinfo_container .userinfo_box .right_box .nickname_box {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
    }

    .userinfo_container .userinfo_box .right_box .nickname_box p {
        margin-right: 0.5rem;
    }

    .userinfo_container .userinfo_box .right_box .nickname_box .nickname {
        font-size: 1.5rem;
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

    .userinfo_container .userinfo_box .right_box .nickname_box .follow {
        padding: 0.5rem 1rem;
        background-color: ${(props) => props.theme.colors.signature};
        border-radius: 0.5rem;
        color: white;
        font-weight: bold;
        cursor: pointer;
    }

    .userinfo_container .userinfo_box .right_box .nickname_box .unfollow {
        padding: 0.5rem 1rem;
        background-color: ${(props) => props.theme.colors.writeGray};
        border-radius: 0.5rem;
        color: black;
        font-weight: bold;
        cursor: pointer;
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

const GridViewContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3개의 칸씩 */
    gap: 1rem; /* 아이템 간 간격 */
    margin-top: 2rem;
    margin-bottom: 2rem;
`;
