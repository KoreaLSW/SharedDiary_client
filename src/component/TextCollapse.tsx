import React, { useState } from 'react';
import styled from 'styled-components';

type Props = {
    text: string;
    showLine: number;
    showText: number;
};

export function TextCollapse({ text, showLine, showText }: Props) {
    const [showFullText, setShowFullText] = useState(false);

    const toggleFullText = () => {
        setShowFullText(!showFullText);
    };

    const lines = text.split('\n');
    const charCount = text.length;

    let displayText = text;
    let buttonText = '더 보기';

    if (!showFullText) {
        if (lines.length > showLine) {
            displayText = lines.slice(0, showLine).join('\n') + '...';
            buttonText = '더 보기';
        }
        if (charCount > showText) {
            displayText = text.slice(0, showText) + '...';
            buttonText = '더 보기';
        }
    } else {
        buttonText = '접기';
    }

    const shouldShowButton = lines.length > showLine || charCount > showText;

    return (
        <TextContainer>
            <TextContent>{displayText}</TextContent>
            {shouldShowButton && (
                <ShowMoreButton onClick={toggleFullText}>
                    {buttonText}
                </ShowMoreButton>
            )}
        </TextContainer>
    );
}

const TextContainer = styled.div`
    font-size: 0.9rem;
`;

const TextContent = styled.p`
    margin: 0;
    white-space: pre-line;
`;

const ShowMoreButton = styled.button`
    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.signature};
    border: none;
    background: none;
    cursor: pointer;
    margin-top: 0.5rem;
`;
