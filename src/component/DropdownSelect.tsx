import React, { useState } from 'react';
import { styled } from 'styled-components';
import {
    EmotionType,
    SelectOption,
    ShareType,
    WeatherType,
} from '../type/type';

type Props = {
    options: WeatherType[] | EmotionType[] | ShareType[];
    option_name: string;
    onSelect: (selectedOption: SelectOption) => void;
};

export function DropdownSelect({ options, option_name, onSelect }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (
        option: WeatherType | EmotionType | ShareType
    ) => {
        if ('weather_text' in option) {
            setSelectedOption(option.weather_text);
            onSelect({ option_id: option.weather_id, option_type: 'weather' });
        } else if ('emotion_text' in option) {
            setSelectedOption(option.emotion_text);
            onSelect({ option_id: option.emotion_id, option_type: 'emotion' });
        } else if ('share_text' in option) {
            setSelectedOption(option.share_text);
            onSelect({ option_id: option.share_id, option_type: 'share_type' });
        }
        setIsOpen(false);
    };

    return (
        <SelectContainer>
            <SelectedValue onClick={toggleDropdown}>
                {selectedOption || option_name}
                {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </SelectedValue>
            {isOpen && (
                <OptionsList>
                    {options.map((option, index) => (
                        <OptionItem
                            key={index}
                            onClick={() => handleOptionClick(option)}
                        >
                            {'weather_text' in option
                                ? option.weather_text
                                : 'emotion_text' in option
                                ? option.emotion_text
                                : 'share_text' in option && option.share_text}
                        </OptionItem>
                    ))}
                </OptionsList>
            )}
        </SelectContainer>
    );
}

const SelectContainer = styled.div`
    width: 100%;
    height: 3rem;
    position: relative;
    display: inline-block;
    margin-top: 1rem;
`;

const SelectedValue = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    background-color: white;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
    outline: none;
    transition: background-color 0.2s, border-color 0.2s;

    &:hover {
        background-color: #e0e0e0;
        border-color: #aaa;
    }
`;

const ChevronIcon = styled.span`
    margin-left: 0.5rem;
`;

const ChevronDownIcon = styled(ChevronIcon)`
    transform: rotate(0deg);
    transition: transform 0.2s;

    ${SelectedValue}:hover & {
        transform: rotate(180deg);
    }
`;

const ChevronUpIcon = styled(ChevronIcon)`
    transform: rotate(180deg);
`;

const OptionsList = styled.ul`
    position: absolute;
    left: 0;
    width: 100%;
    background-color: white;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 4px 4px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1;
`;

const OptionItem = styled.li`
    padding: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #f0f0f0;
    }
`;
