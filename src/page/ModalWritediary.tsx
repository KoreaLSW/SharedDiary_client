import { styled } from 'styled-components';

type Props = {
    toggleModal: () => void;
};

export function ModalWriteDiary({ toggleModal }: Props) {
    return (
        <ModalWrapper>
            <ModalContent>
                <LeftContent>
                    <ModalHeader>
                        <ModalTitle>새 게시물 작성</ModalTitle>
                        <ModalCloseButton onClick={toggleModal}>
                            &times;
                        </ModalCloseButton>
                    </ModalHeader>
                    <TextArea placeholder='Write your post...' />
                    <ModalButton>저장</ModalButton>
                </LeftContent>
                <RightContent>
                    {/* Right content here */}
                    {/* For example: */}
                    <div>Options or additional fields can go here</div>
                </RightContent>
            </ModalContent>
        </ModalWrapper>
    );
}

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContent = styled.div`
    display: flex;
    width: 70%;
    height: 80%;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
`;

const LeftContent = styled.div`
    flex: 7;
    display: flex;
    flex-direction: column;
    padding: 1rem;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding-bottom: 0.5rem;
`;

const ModalTitle = styled.h2`
    font-size: 1.2rem;
`;

const ModalCloseButton = styled.button`
    border: none;
    background-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
`;

const TextArea = styled.textarea`
    flex: 1;
    border: none;
    resize: none;
    padding: 1rem 0;
    font-size: 1rem;
`;

const ModalButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: #0095f6;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 1rem;
`;

const RightContent = styled.div`
    flex: 3;
    padding: 1rem;
    overflow: auto;
`;
