import { useEffect, useState } from 'react';
import { css, keyframes, styled } from 'styled-components';
import { GetDiary } from '../type/diary';
import { AiOutlineUser, AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { GoComment } from 'react-icons/go';

import useDiaryLike from '../hooks/diaryLike';
import { DiaryLike } from '../type/diaryLike';
import { useDiaryMutations } from '../hooks/diary';
import { ModalReadDiary } from './ModalReadDiary';
import { LikeButton } from '../theme/theme';

type Props = {
    info: GetDiary;
    userId: string | undefined;
};

export function DiaryCard({ info, userId }: Props) {
    const [likeStatus, setLikeStatus] = useState<boolean>(
        info.like_check === 1
    );
    const [likeCount, setLikeCount] = useState<number>(info.like_count);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [diaryLike, setDiaryLike] = useState<DiaryLike>({
        diary_id: '',
        user_id: '',
    });
    const { createLike, removeLike } = useDiaryLike();

    useEffect(() => {
        setDiaryLike({
            diary_id: info.diary_id.toString(),
            user_id: userId ? userId : '',
        });
    }, []);

    const handleLikeToggle = () => {
        if (likeStatus) {
            setLikeCount(likeCount - 1);

            removeLike.mutate(diaryLike, {
                onSuccess(data, variables, context) {},
                onError(error: any, variables, context) {},
            });
        } else {
            setLikeCount(likeCount + 1);

            createLike.mutate(diaryLike, {
                onSuccess(data, variables, context) {},
                onError(error: any, variables, context) {},
            });
        }
        setLikeStatus(!likeStatus);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <Card>
            <Heard>
                {info.profile_img ? (
                    <img src={info.profile_img} alt='' />
                ) : (
                    <AiOutlineUser className='no-profile' />
                )}

                <TiTle>
                    <p className='nickname'>{info.nickname}</p>
                    <p className='date'>{info.create_date}</p>
                </TiTle>
            </Heard>
            <Body>
                <p className='title'>{info.contents}</p>
            </Body>
            <Bottom>
                <LikeButton
                    $liked={likeStatus ? 'true' : 'false'}
                    $type='diary'
                    onClick={handleLikeToggle}
                >
                    {likeStatus ? (
                        <AiFillLike className='like' />
                    ) : (
                        <AiOutlineLike className='like' />
                    )}
                </LikeButton>

                <p>{likeCount}</p>
                <GoComment className='comment' onClick={toggleModal} />
                <p>{info.comment_count}</p>

                {isModalOpen && (
                    <ModalReadDiary
                        info={info}
                        userId={userId}
                        toggleModal={toggleModal}
                    />
                )}
            </Bottom>
        </Card>
    );
}

const Card = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
`;

const Heard = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: start;

    .no-profile {
        font-size: 1.5rem;
        margin-right: 0.5rem;
    }
`;

const TiTle = styled.div`
    .nickname {
        font-size: 1rem;
    }

    .date {
        font-size: 0.8rem;
        font-weight: 100;
        color: ${(props) => props.theme.colors.grayText};
    }
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
`;

const Bottom = styled.div`
    display: flex;
    align-items: center;
    margin: 1rem 0;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${(props) => props.theme.colors.line};

    .like,
    .comment {
        font-size: 1.2rem;
        margin-right: 0.1rem;
        cursor: pointer;
    }

    p {
        margin-right: 1rem;
        font-size: 0.8rem;
    }
`;
