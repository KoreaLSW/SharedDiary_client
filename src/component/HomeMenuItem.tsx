import { styled } from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Follow, HomeMenuItems, HomeMenuUnion } from '../page/Home';
type Props<T, R> = {
    info: HomeMenuItems<T, R>;
};

export function HomeMenuItem<T, R>({ info }: Props<T, R>) {
    const navigate = useNavigate();
    const [first, setFirst] = useState<HomeMenuItems<string, number>>();
    const [second, setSecond] = useState<HomeMenuItems<string, number>>();
    const [third, setThird] =
        useState<HomeMenuItems<Follow<string>, Follow<number>>>();

    useEffect(() => {
        info.type === 'first'
            ? setFirst(info as HomeMenuItems<string, number>)
            : info.type === 'second'
            ? setSecond(info as HomeMenuItems<string, number>)
            : setThird(info as HomeMenuItems<Follow<string>, Follow<number>>);
    }, []);

    const onPageMove = (type: HomeMenuUnion) => {
        if (type === 'first') {
            navigate('/mysharediary');
        }
    };

    if (first) {
        return (
            <Item onClick={() => onPageMove(first.type)}>
                <span>{first.name}</span>
                <span>{first.score}</span>
            </Item>
        );
    } else if (second) {
        return (
            <Item onClick={() => onPageMove(second.type)}>
                <span>{second.name}</span>
            </Item>
        );
    } else if (third) {
        return (
            <Item onClick={() => onPageMove(third.type)}>
                <span>
                    {third.name.follower} {third.score.follower}
                </span>
                <span>
                    {third.name.following} {third.score.following}
                </span>
            </Item>
        );
    } else {
        return <Item></Item>;
    }
}

const Item = styled.li`
    width: 31%;
    height: 8rem;
    border: 1px solid ${(props) => props.theme.colors.line};
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    li:hover {
        background-color: aqua;
    }

    span {
        font-size: 1.5rem;
    }
`;
