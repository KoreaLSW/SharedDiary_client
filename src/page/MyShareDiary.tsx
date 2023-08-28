import React, { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { useDiaryMonth, useDiaryUser } from '../hooks/diary';
import { Container, Content } from '../theme/theme';
import { dateAtome, userAtom } from '../recoil/authAtom';
import { GetDiary } from '../type/diary';
import { DiaryCard } from '../component/DiaryCard';
import { styled } from 'styled-components';

export function MyShareDiary() {
    const user = useRecoilValue(userAtom);
    const date = useRecoilValue(dateAtome);

    // const { data, isLoading, isError } = useDiaryMonth({
    //     user_id: user!,
    //     month: date.getMonth() + 1,
    // });

    const { data, fetchNextPage, hasNextPage, isLoading, isError } =
        useDiaryMonth({
            user_id: user!,
            month: date.getMonth() + 1,
        });

    const bottomBoundaryRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            },
            { rootMargin: '10px' }
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

    //data && console.log('MyShareDiary', data);
    return (
        <Container>
            <Content $maxWidth='500px'>
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

const Ul = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
`;
