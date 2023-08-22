import { useState } from 'react';
import { styled } from 'styled-components';

type Props = {
    imageArray: (string | null)[];
};

export function ImageSlider({ imageArray }: Props) {
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    const handleSlideChange = (newSlide: number) => {
        setCurrentSlide(newSlide);
    };

    return (
        <Slider>
            {imageArray.map((value, index) => (
                <Slide key={index} isActive={index === currentSlide}>
                    <Image src={`http://${value!}`} alt={`Slide ${index}`} />
                </Slide>
            ))}
            <SlideButtons>
                {imageArray.map((_, i) => (
                    <SlideButton
                        key={i}
                        isActive={i === currentSlide}
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
    );
}

const Slider = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    background-color: black;
    overflow: hidden;
`;

const Slide = styled.div<{ isActive: boolean }>`
    position: absolute;
    top: 0;
    left: ${(props) => (props.isActive ? '0' : '100%')};
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

const SlideButton = styled.div<{ isActive: boolean }>`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${(props) => (props.isActive ? 'black' : 'gray')};
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
