import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { AiOutlineLike, AiOutlineLock } from 'react-icons/ai';
import { GoComment } from 'react-icons/go';
import { GetDiary } from '../type/diary';
import { WeatherEmoji } from './WeatherEmoji';
import { EmotionEmoji } from './EmotionEmoji';
import { ModalReadDiary } from './ModalReadDiary';
import { userAtom } from '../recoil/authAtom';

type Props = {
    info: GetDiary;
};

export function ProfileGiaryCard({ info }: Props) {
    const user = useRecoilValue(userAtom);
    const [isModalReadOpen, setIsModalOpen] = useState(false);
    const [imageArray, setImageArray] = useState([
        info.image_01,
        info.image_02,
        info.image_03,
        info.image_04,
        info.image_05,
    ]);

    useEffect(() => {
        // imageArray에 null이 있으면 배열에서 삭제한다
        const filteredImageArray = imageArray.filter((item) => item !== null);
        setImageArray(filteredImageArray);
    }, []);

    useEffect(() => {
        if (isModalReadOpen) {
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
    }, [isModalReadOpen]);

    const toggleReadModal = () => {
        setIsModalOpen(!isModalReadOpen);
    };

    return (
        <Card>
            <SquareImageContainer onClick={toggleReadModal}>
                {info.image_01 ? (
                    <SquareImage src={info.image_01} alt='' />
                ) : (
                    <NoImage
                        src='https://dmemema.cafe24.com/img/noimg/noimg.png'
                        alt=''
                    />
                )}
                <ImageOverlay>
                    <p>
                        <AiOutlineLike /> {info.like_count}
                    </p>

                    <p>
                        <GoComment /> {info.comment_count}
                    </p>
                </ImageOverlay>
            </SquareImageContainer>
            <p className='date'>{info.diary_date}</p>
            <div className='emotion'>
                <WeatherEmoji type={info.weather} />
                <EmotionEmoji type={info.emotion} />
                {info.share_type === 2 && <AiOutlineLock />}
            </div>
            {isModalReadOpen && (
                <ModalReadDiary
                    info={info}
                    userId={user}
                    toggleReadModal={toggleReadModal}
                    imageArray={imageArray}
                />
            )}
        </Card>
    );
}

const Card = styled.div`
    width: 100%;

    .date {
        font-size: 0.8rem;
    }

    .emotion {
        display: flex;
        align-items: center;
    }
    .emotion span {
        display: none;
    }
`;

const SquareImageContainer = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    margin-bottom: 0.5rem;
`;

const SquareImage = styled.img`
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const NoImage = styled.img`
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 20%;
    object-fit: cover;
`;

const ImageOverlay = styled.div`
    display: flex;
    gap: 1rem;
    color: white;
    font-size: 1.5rem;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* 반투명한 검은 배경 */
    opacity: 0; /* 초기에는 투명하게 설정 */
    transition: opacity 0.2s ease-in-out; /* 부드러운 페이드 효과를 위한 트랜지션 */
    pointer-events: none; /* 오버레이를 클릭 가능하도록 */
    ${SquareImageContainer}:hover & {
        opacity: 1; /* 호버 시에만 투명도를 1로 변경하여 보이게 함 */
    }
`;
