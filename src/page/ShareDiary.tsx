import React, { useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';

import { Container, Content } from '../theme/theme';
import { useDiaryAll } from '../hooks/diary';
import { userAtom } from '../recoil/authAtom';
import { GetDiary } from '../type/diary';
import { DiaryCard } from '../component/DiaryCard';

export function ShareDiary() {
    const user = useRecoilValue(userAtom);

    const { data, fetchNextPage, hasNextPage, isLoading, isError } =
        useDiaryAll(user);

    const bottomBoundaryRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            },
            { rootMargin: '200px' }
        );

        if (bottomBoundaryRef.current) {
            observer.observe(bottomBoundaryRef.current);
        }

        return () => {
            if (bottomBoundaryRef.current) {
                observer.unobserve(bottomBoundaryRef.current);
            }
        };
    }, [bottomBoundaryRef, fetchNextPage, hasNextPage]);

    return (
        <Container>
            <Content $maxWidth='500px'>
                <H1>공유 일기</H1>
                <Ul>
                    {data?.pages.map((page, pageIndex) => (
                        <React.Fragment key={pageIndex}>
                            {page.data.data.map(
                                (item: GetDiary, index: number) => (
                                    <li key={index}>
                                        <DiaryCard info={item} userId={user} />
                                    </li>
                                )
                            )}
                        </React.Fragment>
                    ))}
                </Ul>
                <div ref={bottomBoundaryRef}></div>
                {isLoading && <p>로딩 중...</p>}
            </Content>
        </Container>
    );
}

const Ul = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const H1 = styled.h1`
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 3rem;
`;
