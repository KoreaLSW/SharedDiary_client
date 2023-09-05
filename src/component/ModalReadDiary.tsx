import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { GetDiary } from '../type/diary';
import { useCommentMutations, useGetComment } from '../hooks/comment';
import { SetComments, GetComment } from '../type/comment';
import { CommentCard } from './CommentCard';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { GoComment } from 'react-icons/go';
import useDiaryLike from '../hooks/diaryLike';
import { DiaryLike } from '../type/diaryLike';
import { ImageSlider } from './ImageSlider';
import { WeatherEmoji } from './WeatherEmoji';
import { EmotionEmoji } from './EmotionEmoji';

type Props = {
    info: GetDiary;
    userId: string | undefined;
    imageArray: (string | null)[];
    toggleReadModal: () => void;
};

export function ModalReadDiary({
    info,
    userId,
    imageArray,
    toggleReadModal,
}: Props) {
    const { createComment } = useCommentMutations();
    const { createLike, removeLike } = useDiaryLike();

    const [comment, setComment] = useState<SetComments>({
        diary_id: info.diary_id.toString(),
        user_id: userId!,
        contents: '',
    });

    const [likeStatus, setLikeStatus] = useState<boolean>(
        info.like_check === 1
    );
    const [likeCount, setLikeCount] = useState<number>(info.like_count);
    const [diaryLike, setDiaryLike] = useState<DiaryLike>({
        diary_id: '',
        user_id: '',
    });

    useEffect(() => {
        setDiaryLike({
            diary_id: info.diary_id.toString(),
            user_id: userId ? userId : '',
        });
    }, []);

    const { data, isLoading, isError } = useGetComment(
        userId,
        info.diary_id.toString()
    );
    //data && console.log('data', data.data);

    const handleAddComment = () => {
        // 댓글 추가 로직 구현
        //console.log('Added comment:', comment);
        if (comment.contents === '') {
            alert('댓글을 입력해 주세요.');
            return;
        }
        setComment((res) => ({
            ...res,
            contents: '',
        }));

        createComment.mutate(comment, {
            onSuccess(data, variables, context) {},
            onError(error: any, variables, context) {},
        });
    };

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
    return (
        <ModalWrapper>
            <ModalContent>
                <LeftSection>
                    <LeftHeader>
                        <UserAvatar src={info.profile_img!} />

                        <UserInfoBox>
                            <p className='nickname'>{info.nickname}</p>
                            <p className='diarydate'>
                                일기날짜: {info.diary_date}
                            </p>
                            <p className='createdate'>
                                작성날짜: {info.create_date}
                            </p>
                        </UserInfoBox>
                    </LeftHeader>
                    <MainBox>
                        {imageArray.length > 0 && (
                            <ImageSlider imageArray={imageArray} />
                        )}
                        <p className='contents'>
                            {info.contents.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}
                        </p>
                    </MainBox>
                    <TypeBox>
                        <WeatherEmoji type={info.weather} />
                        <EmotionEmoji type={info.emotion} />
                        <LikeButton
                            $liked={likeStatus ? 'true' : 'false'}
                            className='likebtn'
                            onClick={handleLikeToggle}
                        >
                            {likeStatus ? (
                                <AiFillLike style={{ color: '#ff5050' }} />
                            ) : (
                                <AiOutlineLike />
                            )}
                            <span>{likeCount}개</span>
                        </LikeButton>
                        <div>
                            <GoComment />
                            <span>{info.comment_count}개</span>
                        </div>
                    </TypeBox>
                </LeftSection>
                <RightSection>
                    {data && data.data.length <= 0 ? (
                        <NotCommentBox>
                            <p>작성된 댓글이 없습니다...</p>
                        </NotCommentBox>
                    ) : (
                        <ul>
                            {data &&
                                data.data.map(
                                    (info: GetComment, index: number) => (
                                        <CommentCard key={index} info={info} />
                                    )
                                )}
                        </ul>
                    )}

                    <CommentBox>
                        <CommentInput
                            type='text'
                            value={comment.contents}
                            onChange={(e) =>
                                setComment((res) => ({
                                    ...res,
                                    contents: e.target.value,
                                }))
                            }
                            placeholder='댓글을 입력하세요'
                        />
                        <AddCommentButton onClick={handleAddComment}>
                            댓글 추가
                        </AddCommentButton>
                    </CommentBox>
                </RightSection>
            </ModalContent>
            <ModalCloseButton onClick={toggleReadModal}>
                &times;
            </ModalCloseButton>
        </ModalWrapper>
    );
}

// 모달 스타일
const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;

    /* 스크롤바 스타일 변경 */
    ::-webkit-scrollbar {
        width: 0;
        display: none;
    }
`;

const ModalContent = styled.div`
    width: 80%;
    max-width: 950px;
    height: 90vh;
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        width: 100%;
        height: 100%;
        border-radius: 0px;
        flex-direction: column;
        overflow: scroll;
    }
`;

const LeftSection = styled.div`
    flex: 1;
    border-right: 1px solid #f0f0f0;
    height: 100%;
`;

const LeftHeader = styled.header`
    position: sticky;
    top: 1rem;
    display: flex;
    height: 3rem;
    align-items: center;
    margin: 1rem;
    .no-profile {
        font-size: 2rem;
        margin-right: 1rem;
    }
    @media (max-width: 768px) {
        position: static;
    }
`;

const UserAvatar = styled.img`
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 1rem;
    border-radius: 50%;
    object-fit: cover;
`;

const UserInfoBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    .nickname {
        font-size: 1rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    .createdate {
        font-size: 0.8rem;
        color: ${(props) => props.theme.colors.grayText};
    }
`;

const MainBox = styled.div`
    display: flex;
    height: calc(100% - 10rem);
    flex-direction: column;
    flex: 1;
    overflow-y: scroll;
    border-top: 1px solid ${(props) => props.theme.colors.line};
    div {
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .contents {
        margin: 0.5rem;
        font-size: 1rem;
    }
`;
const TypeBox = styled.div`
    position: sticky;
    bottom: 0;
    top: calc(100% - 5rem);
    height: 5rem;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    border-top: 1px solid ${(props) => props.theme.colors.line};
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
    }
    span {
        margin-top: 0.3rem;
        font-size: 0.8rem;
    }

    .likebtn {
        cursor: pointer;
    }

    @media (max-width: 768px) {
        position: static;
        padding: 1rem;
        div {
            font-size: 1.5rem;
        }
    }
`;

const RightSection = styled.div`
    flex: 1;
    overflow-y: auto;
    position: relative;
    height: 100%;

    @media (max-width: 768px) {
        overflow: visible;
    }
`;

const NotCommentBox = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CommentBox = styled.div`
    position: sticky;
    bottom: 0;
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    top: calc(100% - 3rem);
`;

const CommentInput = styled.input`
    width: 80%;
    height: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const AddCommentButton = styled.button`
    width: 20%;
    height: 100%;
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
`;

const ModalCloseButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 2rem;

    @media (max-width: 768px) {
        top: 5px;
        right: 15px;
        color: black;
    }
`;

export const LikeButton = styled.div<{ $liked: string }>`
    border: none;
    background: none;
    cursor: pointer;

    ${({ $liked }) =>
        $liked === 'true' &&
        css`
            animation: ${bounceAnimation} 0.4s ease-in-out;
        `}
`;

const bounceAnimation = keyframes`
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.2);
    }
`;
