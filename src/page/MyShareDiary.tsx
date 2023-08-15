import { useRecoilValue } from 'recoil';
import { useDiaryUser } from '../hooks/diary';
import { Container, Content } from '../theme/theme';
import { userAtom } from '../recoil/authAtom';
import { GetDiary } from '../type/diary';
import { DiaryCard } from '../component/DiaryCard';
import { styled } from 'styled-components';

export function MyShareDiary() {
    const user = useRecoilValue(userAtom);

    const { data, isLoading, isError } = useDiaryUser(user);

    data && console.log('MyShareDiary', data);
    return (
        <Container>
            <Content $maxWidth='550px'>
                <Ul>
                    {data &&
                        user &&
                        data.data.map((item: GetDiary, index: number) => {
                            return (
                                <li key={index}>
                                    <DiaryCard info={item} userId={user} />
                                </li>
                            );
                        })}
                </Ul>
            </Content>
        </Container>
    );
}

const Ul = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;
