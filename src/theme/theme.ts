import { styled } from 'styled-components';

export const theme = {
    colors: {
        signature: '#3e8df6',
        line: '#e3e3e3',
        grayText: '#b9b9b9',
        sky: '#f1f8fe',
        skyText: '#cfd1e2',
        red: '#e0115f',
    },
};

export const Container = styled.div`
    margin-left: 15%;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 4rem;
`;

export const Content = styled.div<{ $maxWidth: string }>`
    max-width: ${(props) => props.$maxWidth};
    width: 85%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
