import React, { useEffect, useState } from 'react';
import { css, keyframes, styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { GetDiary } from '../type/diary';
import { AiOutlineLike, AiFillLike, AiOutlineLock } from 'react-icons/ai';
import { GoComment } from 'react-icons/go';

import useDiaryLike from '../hooks/diaryLike';
import { DiaryLike } from '../type/diaryLike';
import { useDiaryMutations } from '../hooks/diary';
import { ModalReadDiary } from './ModalReadDiary';
import { LikeButton } from '../theme/theme';
import { ModalUpdateDiary } from './ModalUpdateDiary';
import { TextCollapse } from './TextCollapse';

type Props = {
    info: GetDiary;
    userId: string | undefined;
};

export function DiaryCard({ info, userId }: Props) {
    const navigate = useNavigate();
    const { createLike, removeLike } = useDiaryLike();
    const { removeDiaryHook } = useDiaryMutations();

    const [showFullText, setShowFullText] = useState(false);
    const [likeStatus, setLikeStatus] = useState<boolean>(
        info.like_check === 1
    );
    const [likeCount, setLikeCount] = useState<number>(info.like_count);
    const [isModalReadOpen, setIsModalOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const [diaryLike, setDiaryLike] = useState<DiaryLike>({
        diary_id: '',
        user_id: '',
    });

    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [imageArray, setImageArray] = useState([
        info.image_01,
        info.image_02,
        info.image_03,
        info.image_04,
        info.image_05,
    ]);

    useEffect(() => {
        setDiaryLike({
            diary_id: info.diary_id.toString(),
            user_id: userId ? userId : '',
        });

        // imageArray에 null이 있으면 배열에서 삭제한다
        const filteredImageArray = imageArray.filter((item) => item !== null);
        setImageArray(filteredImageArray);
    }, []);

    useEffect(() => {
        if (isModalReadOpen || isModalUpdateOpen) {
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
    }, [isModalReadOpen, isModalUpdateOpen]);

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

        // 애니메이션 토글
        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false);
        }, 1000); // 애니메이션 시간에 맞춰 조정
    };

    const handleSlideChange = (newSlide: number) => {
        setCurrentSlide(newSlide);
    };

    const toggleFullText = () => {
        setShowFullText(!showFullText);
    };

    const toggleReadModal = () => {
        setIsModalOpen(!isModalReadOpen);
    };

    const toggleUpdateModal = () => {
        setIsModalUpdateOpen(!isModalUpdateOpen);
    };

    const handleDeleteDiary = () => {
        const result = window.confirm('게시물을 삭제하시겠습니까?');

        if (result) {
            removeDiaryHook.mutate(
                { diary_id: info.diary_id, user_id: userId! },
                {
                    onSuccess(data, variables, context) {
                        alert('게시물이 삭제되었습니다.');
                    },
                    onError(error, variables, context) {},
                }
            );
        }
    };

    return (
        <Card>
            <Heard>
                <Avatar
                    src={info.profile_img ? info.profile_img : '/noprofile.jpg'}
                    alt='프로필사진'
                    onClick={() => navigate(`/profile/${info.user_id}`)}
                />

                <TiTle>
                    <p className='nickname'>{info.nickname}</p>
                    <p className='diarydate'>{info.diary_date}날의 일기</p>
                    <p className='date'>{info.create_date}</p>
                </TiTle>
            </Heard>
            <Body>
                {imageArray.length > 0 && (
                    <Slider>
                        {imageArray.map((value, index) => (
                            <Slide
                                key={index}
                                $isActive={index === currentSlide}
                            >
                                <Image src={value!} alt={`Slide ${index}`} />
                            </Slide>
                        ))}
                        <SlideButtons>
                            {imageArray.map((_, i) => (
                                <SlideButton
                                    key={i}
                                    $isActive={i === currentSlide}
                                    onClick={() => handleSlideChange(i)}
                                />
                            ))}
                        </SlideButtons>
                        <SlideArrows>
                            <ArrowButton
                                onClick={() =>
                                    handleSlideChange(
                                        (currentSlide - 1 + imageArray.length) %
                                            imageArray.length
                                    )
                                }
                            >
                                {'<'}
                            </ArrowButton>
                            <ArrowButton
                                onClick={() =>
                                    handleSlideChange(
                                        (currentSlide + 1) % imageArray.length
                                    )
                                }
                            >
                                {'>'}
                            </ArrowButton>
                        </SlideArrows>
                    </Slider>
                )}

                <ContentText>
                    <TextCollapse
                        text={info.contents}
                        showLine={5}
                        showText={100}
                    />
                </ContentText>
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
                <GoComment className='comment' onClick={toggleReadModal} />
                <p>{info.comment_count}</p>

                {userId === info.user_id && (
                    <p className='update' onClick={toggleUpdateModal}>
                        수정
                    </p>
                )}
                {userId === info.user_id && (
                    <p className='delete' onClick={handleDeleteDiary}>
                        삭제
                    </p>
                )}

                {info.share_type === 2 && <AiOutlineLock />}

                {isModalReadOpen && (
                    <ModalReadDiary
                        info={info}
                        userId={userId}
                        toggleReadModal={toggleReadModal}
                        imageArray={imageArray}
                    />
                )}

                {isModalUpdateOpen && (
                    <ModalUpdateDiary
                        info={info}
                        toggleUpdateModal={toggleUpdateModal}
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
        font-size: 2rem;
        margin-right: 0.5rem;
        cursor: pointer;
    }

    @media (max-width: 768px) {
        margin-left: 0.8rem;
        margin-right: 0.8rem;
    }
`;

const Avatar = styled.img`
    width: 3rem;
    height: 3rem;
    margin-right: 0.5rem;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
`;

const TiTle = styled.div`
    .nickname {
        font-size: 1rem;
        margin-bottom: 0.3rem;
    }

    .diarydate {
        font-size: 0.8rem;
        font-weight: bold;
        color: ${(props) => props.theme.colors.darkGrayText};
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

    .contents {
        margin-top: 1rem;
    }
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

    .update {
        cursor: pointer;
        color: ${(props) => props.theme.colors.signature};
    }

    .delete {
        cursor: pointer;
        color: ${(props) => props.theme.colors.red};
    }

    @media (max-width: 768px) {
        margin-left: 0.8rem;
        margin-right: 0.8rem;
    }
`;

const Slider = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    background-color: black;
    overflow: hidden;
`;

const Slide = styled.div<{ $isActive: boolean }>`
    position: absolute;
    top: 0;
    left: ${(props) => (props.$isActive ? '0' : '100%')};
    width: 100%;
    height: 100%;
    opacity: 1;
    transition: left 0.3s ease-in-out;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const SlideButtons = styled.div`
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const SlideButton = styled.div<{ $isActive: boolean }>`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${(props) => (props.$isActive ? 'black' : 'gray')};
    margin: 0 5px;
`;

const SlideControlButton = styled.button`
    border: none;
    background-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    margin: 0 10px;
`;

const SlideArrows = styled.div`
    position: absolute;
    bottom: 45%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 95%;
    transform: translate(2.5%);
`;

const ArrowButton = styled.button`
    width: 1.5rem;
    height: 1.5rem;
    border: none;
    font-weight: bold;
    color: ${(props) => props.theme.colors.skyText};
    background-color: rgba(128, 128, 128, 0.8);
    border-radius: 50%;
    padding: 0.1rem;
    font-size: 0.8rem;
    cursor: pointer;
`;

const ContentText = styled.span`
    margin-top: 0.8rem;
    font-size: 0.9rem;

    @media (max-width: 768px) {
        margin-left: 0.8rem;
        margin-right: 0.8rem;
    }
`;

const FullContentText = styled.span`
    font-size: 0.9rem;
    white-space: pre-line;
`;

const ShowMoreButton = styled.button`
    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.signature};
    border: none;
    background: none;
    cursor: pointer;
    margin-left: 0.5rem;
`;

const ShowLessButton = styled.button`
    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.signature};
    border: none;
    background: none;
    cursor: pointer;
    margin-left: 0.5rem;
`;
