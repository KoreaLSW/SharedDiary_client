import styled from 'styled-components';
import { User } from '../type/diary';
import { FollowCard } from './FollowCard';

type Props = {
    onClose: () => void;
    info: User[]; // 사용자 아이디 타입 정의
    title: string;
};

export function FollowModal({ onClose, info, title }: Props) {
    console.log('FollowingModal', info);

    return (
        <Modal>
            <ModalContent>
                <h2>{title}</h2>

                <FollowerList>
                    {info &&
                        info.map((item: User, index: number) => (
                            <FollowCard
                                key={index}
                                info={item}
                                onClose={onClose}
                            />
                        ))}
                </FollowerList>
                <CloseButton onClick={onClose}>&times;</CloseButton>
            </ModalContent>
        </Modal>
    );
}

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    position: relative;
    width: 25rem;
    height: 30rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
`;

const FollowerList = styled.ul`
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 1rem;
    overflow-y: auto;
`;

const FollowerListItem = styled.li`
    padding: 0.5rem;
    border-bottom: 1px solid ${(props) => props.theme.colors.line};
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:last-child {
        border-bottom: none;
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 5px;
    right: 10px;
    background: none;
    color: black;
    border: none;
    cursor: pointer;
    font-size: 2rem;
`;
