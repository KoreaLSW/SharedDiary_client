import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

import { SetDiary } from '../type/diary';
import { useRecoilValue } from 'recoil';
import { emotionAtom, userAtom, weatherAtom } from '../recoil/authAtom';
import { DropdownSelect } from './DropdownSelect';
import {
    EmotionType,
    SelectOption,
    ShareType,
    WeatherType,
} from '../type/type';
import { useDiaryMutations } from '../hooks/diary';
import { Loding } from './Loading';

type Props = {
    modalDate: string;
    toggleModal: () => void;
};

const formData = new FormData();
const MAX_LENGTH = 2500;

export function ModalWriteDiary({ modalDate, toggleModal }: Props) {
    const user = useRecoilValue(userAtom);
    const weather = useRecoilValue(weatherAtom);
    const emotion = useRecoilValue(emotionAtom);

    const { createDiaryHook } = useDiaryMutations();

    const [weatherOption, setWeatherOption] = useState<WeatherType[]>(weather);
    const [emotionOption, setEmotionOption] = useState<EmotionType[]>(emotion);
    const [shareOption, setShareOption] = useState<ShareType[]>([
        { share_id: 1, share_text: '공유' },
        { share_id: 2, share_text: '공유 안함' },
    ]);

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [diary, setDiary] = useState<SetDiary>({
        user_id: user!,
        create_date: '',
        diary_date: modalDate,
        contents: '',
        share_type: 0,
        weather: 0,
        emotion: 0,
        image_01: null,
        image_02: null,
        image_03: null,
        image_04: null,
        image_05: null,
    });

    const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newContents = event.target.value; // 입력된 내용을 가져옴
        setDiary((prev) => ({ ...prev, contents: newContents }));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let files = event.target.files;
        // 이미지 업로드 전에 초기화
        formData.delete('images');

        files && console.log('1232112312', files.length);

        if (files && files.length > 5) {
            files = null;
            return alert('이미지는 최대 5장까지 선택가능합니다.');
        }

        if (files) {
            const selected = Array.from(files).slice(0, 5); // 최대 5개까지 선택
            console.log('selected', selected);

            setSelectedFiles(selected);
            setCurrentSlide(0); // 첫 번째 슬라이드로 초기화

            for (let i = 0; i < selected.length; i++) {
                formData.append('images', selected[i]);
            }
        }
    };

    const handleSlideChange = (newSlide: number) => {
        setCurrentSlide(newSlide);
    };

    const handleSelect = (selectedOption: SelectOption) => {
        // 오늘 감정 및 날씨 및 공유여부를 diary에 저장
        setDiary((prev) => ({
            ...prev,
            [selectedOption.option_type]: selectedOption.option_id,
        }));
    };

    const handleDiaryUpload = () => {
        formData.delete('diary');
        console.log('diary', diary);
        formData.append('diary', JSON.stringify(diary));

        if (diary.contents === '') {
            return alert('내용을 입력해 주세요');
        }
        if (MAX_LENGTH < diary.contents.length) {
            return alert(`최대 ${MAX_LENGTH}자까지 가능합니다.`);
        }
        if (diary.weather === 0) {
            return alert('오늘의 날씨를 선택해주세요');
        }
        if (diary.emotion === 0) {
            return alert('오늘의 기분을 선택해주세요');
        }
        if (diary.share_type === 0) {
            return alert('공유 여부를 선택해주세요');
        }

        createDiaryHook.mutate(formData, {
            onSuccess(data, variables, context) {
                formData.delete('diary');
                formData.delete('images');
                window.alert('작성이 완료되었습니다.');
                console.log('감화니..');

                toggleModal();
            },
            onError(error, variables, context) {},
        });
    };

    if (createDiaryHook.isLoading) {
        return <Loding />;
    }

    return (
        <ModalWrapper>
            <ModalContent>
                <LeftContent>
                    <ModalHeader>
                        <ModalTitle>새로운 일기 작성</ModalTitle>
                        <ModalCloseButton
                            onClick={() => {
                                const result = window.confirm(
                                    '취소를 하게되면 작성했던 내용이 삭제됩니다.\n취소하시겠습니까?'
                                );
                                result && toggleModal();
                            }}
                        >
                            &times;
                        </ModalCloseButton>
                    </ModalHeader>
                    <TextArea
                        placeholder='일기를 입력해 주세요...'
                        value={diary.contents}
                        onChange={handleOnChange}
                        maxLength={MAX_LENGTH}
                    />
                    <p className='max_length'>
                        {diary.contents.length}/{MAX_LENGTH}
                    </p>
                    <ModalButton onClick={handleDiaryUpload}>저장</ModalButton>
                </LeftContent>
                <RightContent>
                    <FileInput
                        type='file'
                        accept='video/*, image/*'
                        multiple
                        onChange={handleFileChange}
                    />
                    {selectedFiles.length > 0 && (
                        <Slider>
                            {selectedFiles.map((file, index) => (
                                <Slide
                                    key={index}
                                    $isActive={index === currentSlide}
                                >
                                    <Image
                                        src={URL.createObjectURL(file)}
                                        alt={`Slide ${index}`}
                                    />
                                </Slide>
                            ))}
                            <SlideButtons>
                                {selectedFiles.map((_, i) => (
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
                                            (currentSlide -
                                                1 +
                                                selectedFiles.length) %
                                                selectedFiles.length
                                        )
                                    }
                                >
                                    &lt;
                                </ArrowButton>
                                <ArrowButton
                                    onClick={() =>
                                        handleSlideChange(
                                            (currentSlide + 1) %
                                                selectedFiles.length
                                        )
                                    }
                                >
                                    &gt;
                                </ArrowButton>
                            </SlideArrows>
                        </Slider>
                    )}
                    <DropdownSelect
                        options={weatherOption}
                        option_name='오늘 날씨를 선택해주세요'
                        onSelect={handleSelect}
                    />
                    <DropdownSelect
                        options={emotionOption}
                        option_name='오늘 감정을 선택해주세요'
                        onSelect={handleSelect}
                    />
                    <DropdownSelect
                        options={shareOption}
                        option_name='공유 여부를 선택해주세요'
                        onSelect={handleSelect}
                    />
                </RightContent>
            </ModalContent>
        </ModalWrapper>
    );
}

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;

    /* 스크롤바 스타일 변경 */
    ::-webkit-scrollbar {
        width: 0;
        display: none;
    }
`;

const ModalContent = styled.div`
    display: flex;
    width: 70%;
    height: 80%;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;

    @media (max-width: 768px) {
        width: 100%;
        height: 100%;
        border-radius: 0px;
        flex-direction: column;
        overflow-y: scroll;
    }
`;

const LeftContent = styled.div`
    flex: 6;
    display: flex;
    flex-direction: column;
    padding: 1rem;

    .max_length {
        text-align: right;
        font-size: 0.8rem;
        color: ${(props) => props.theme.colors.grayText};
    }
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding-bottom: 0.5rem;
`;

const ModalTitle = styled.h2`
    font-size: 1.2rem;
`;

const ModalCloseButton = styled.button`
    border: none;
    background-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
`;

const TextArea = styled.textarea`
    flex: 1;
    border: none;
    resize: none;
    padding: 1rem 0.5rem;
    font-size: 1rem;

    @media (max-width: 768px) {
        min-height: 15rem;
    }
`;

const ModalButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: ${(props) => props.theme.colors.signature};
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 1rem;
`;

const RightContent = styled.div`
    flex: 4;
    padding: 1rem;
    overflow: auto;
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
        overflow: visible;
    }
`;

const FileInput = styled.input`
    margin-bottom: 1rem;
`;

const Slider = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 100%;
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
    object-fit: cover;
`;

const SlideButtons = styled.div`
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
`;

const SlideButton = styled.div<{ $isActive: boolean }>`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${(props) => (props.$isActive ? 'black' : 'gray')};
    margin: 0 5px;
    cursor: pointer;
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
    border: none;
    background-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
`;
