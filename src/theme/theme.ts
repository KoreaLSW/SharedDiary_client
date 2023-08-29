import { css, keyframes, styled } from 'styled-components';

export const theme = {
    colors: {
        signature: '#4193ef',
        line: '#e3e3e3',
        grayText: '#b9b9b9',
        darkGrayText: '#838383',
        sky: '#f1f8fe',
        skyText: '#cfd1e2',
        red: '#ff0000',
        writeGray: '#efefef',
    },
};

export const Container = styled.div`
    margin-left: 15%;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 4rem;
`;

export const Content = styled.div<{ $maxWidth: string }>`
    max-width: ${(props) => props.$maxWidth};
    width: 85%;
    display: flex;
    flex-direction: column;
`;

export const LikeButton = styled.button<{ $liked: string; $type: string }>`
    color: ${({ $liked }) => ($liked === 'true' ? '#ff5050' : '#8e8e8e')};
    font-size: 1rem;
    border: none;
    background: none;
    cursor: pointer;
    margin-left: ${({ $type }) => ($type === 'diary' ? '0' : 'auto')};

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
