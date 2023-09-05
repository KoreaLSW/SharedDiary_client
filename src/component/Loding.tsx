import { styled, keyframes } from 'styled-components';

export function Loding() {
    return (
        <LodingBox>
            <LoaderContainer>
                <Ripple1 />
                <Ripple2 />
            </LoaderContainer>
        </LodingBox>
    );
}

const LodingBox = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1001;
`;

const rippleAnimation = keyframes`
    0% {
        top: 96px;
        left: 96px;
        width: 0;
        height: 0;
        opacity: 1;
    }
    100% {
        top: 18px;
        left: 18px;
        width: 156px;
        height: 156px;
        opacity: 0;
    }
`;

// RippleAnimation 컴포넌트를 정의할 때 keyframes를 적용합니다.
const RippleAnimation = styled.div`
    position: absolute;

    border-width: 4px;
    border-style: solid;
    opacity: 1;
    border-radius: 50%;
    animation: ${rippleAnimation} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
`;

// 나머지 코드는 이전과 동일합니다.
const LoaderContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    display: inline-block;
    overflow: hidden;
`;

const Ripple1 = styled(RippleAnimation)`
    border-color: #e90c59;
    animation-delay: 0s;
`;

const Ripple2 = styled(RippleAnimation)`
    border-color: #46dff0;
    animation-delay: -0.5s;
`;
