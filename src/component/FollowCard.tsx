import { useState } from 'react';
import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';

import { User } from '../type/diary';
import { useFollowMutations, useGetFollowCheck } from '../hooks/follow';
import { userAtom } from '../recoil/authAtom';
import { useNavigate } from 'react-router-dom';

type Props = {
    info: User;
    onClose: () => void;
};

export function FollowCard({ info, onClose }: Props) {
    const user = useRecoilValue(userAtom);
    const navigate = useNavigate();

    const { data } = useGetFollowCheck({
        followerId: user!,
        followingId: info.user_id,
    });

    const { createFollow, removeFollow } = useFollowMutations();

    // 팔로우 취소
    const handleUnfollow = () => {
        removeFollow.mutate(
            { followerId: user!, followingId: info.user_id },
            {
                onSuccess(data, variables, context) {},
                onError(error, variables, context) {},
            }
        );
    };

    // 팔로우 하기
    const handlefollow = () => {
        createFollow.mutate(
            { followerId: user!, followingId: info.user_id },
            {
                onSuccess(data, variables, context) {},
                onError(error, variables, context) {},
            }
        );
    };

    const handleItemClick = () => {
        navigate(`/profile/${info.user_id}`);
        onClose();
    };

    return (
        <FollowingListItem>
            <img
                className='following-avatar'
                onClick={handleItemClick}
                src={info.profile_img ? info.profile_img : '/noprofile.jpg'}
                alt='프로필 이미지'
            />

            <div className='following-info' onClick={handleItemClick}>
                <p className='following-username'>{info.user_id}</p>
                <p className='following-name'>{info.nickname}</p>
            </div>
            {data && data.data.length > 0 ? (
                <button className='unfollow-button' onClick={handleUnfollow}>
                    팔로잉
                </button>
            ) : (
                <button className='follow-button' onClick={handlefollow}>
                    팔로우
                </button>
            )}
        </FollowingListItem>
    );
}

const FollowingListItem = styled.li`
    display: flex;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid ${(props) => props.theme.colors.line};

    &:last-child {
        border-bottom: none;
    }

    .following-avatar {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        margin-right: 1rem;
        object-fit: cover;
        cursor: pointer;
    }

    .following-info {
        flex-grow: 1;
        cursor: pointer;
    }

    .following-username {
        font-weight: bold;
        margin-bottom: 0.2rem;
    }

    .following-name {
        color: ${(props) => props.theme.colors.gray};
    }

    .unfollow-button {
        padding: 0.5rem 1rem;
        background-color: ${(props) => props.theme.colors.writeGray};
        border: none;
        border-radius: 0.5rem;
        color: black;
        font-weight: bold;
        cursor: pointer;
    }

    .follow-button {
        padding: 0.5rem 1rem;
        background-color: ${(props) => props.theme.colors.signature};
        border: none;
        border-radius: 0.5rem;
        color: white;
        font-weight: bold;
        cursor: pointer;
    }
`;
