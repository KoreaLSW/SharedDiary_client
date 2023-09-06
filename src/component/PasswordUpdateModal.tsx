import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';

interface PasswordModalProps {
    onClose: () => void;
    onPasswordSubmit: (password: string) => void;
}

const passwordRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export function PasswordModal({
    onClose,
    onPasswordSubmit,
}: PasswordModalProps) {
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newPassword = event.target.value;
        setPassword(newPassword);

        if (!passwordRegex.test(newPassword)) {
            setError(
                '비밀번호는 최소 8자 이상이어야 하며, 영문과 숫자를 포함해야 합니다.'
            );
        } else if (error) {
            setError('');
        }
    };

    const handlePasswordConfirmChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setPasswordConfirm(event.target.value);
        if (error) {
            setError('');
        }
    };

    const handleSubmit = () => {
        if (password !== passwordConfirm) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (!passwordRegex.test(password)) {
            setError(
                '비밀번호는 최소 8자 이상이어야 하며, 영문과 숫자를 포함해야 합니다.'
            );
            return;
        }

        onPasswordSubmit(password);

        // 모달 닫기
        onClose();
    };

    return (
        <ModalContainer>
            <ModalContent>
                <h2>비밀번호 변경</h2>
                <input
                    type='password'
                    placeholder='새로운 비밀번호'
                    value={password}
                    onChange={handlePasswordChange}
                />
                <input
                    type='password'
                    placeholder='비밀번호 확인'
                    value={passwordConfirm}
                    onChange={handlePasswordConfirmChange}
                />
                {error && <ErrorText>{error}</ErrorText>}
                <button onClick={handleSubmit}>변경</button>
                <button onClick={onClose}>닫기</button>
            </ModalContent>
        </ModalContainer>
    );
}

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 20px;
    border-radius: 8px;

    h2 {
        margin-bottom: 1rem;
    }

    input {
        width: 30rem;
        border: none;
        margin-bottom: 0.5rem;
        border-radius: 0.3rem;
        background-color: #f6f7f9;
        padding: 0.8rem 1rem;
        ime-mode: disabled;
    }

    button {
        width: 100%;
        padding: 0.8rem 1rem;
        margin-bottom: 0.5rem;
        border-radius: 0.3rem;
        border: none;
        color: #ffffff;
        font-weight: bold;
        cursor: pointer;
    }

    /* 첫 번째 요소의 스타일 적용 */
    button:first-of-type {
        background-color: ${(props) => props.theme.colors.signature};
    }

    /* 마지막 번째 요소의 스타일 적용 */
    button:last-of-type {
        color: black;
    }

    @media (max-width: 768px) {
        width: 95%;
        input {
            width: 100%;
        }

        h2 {
            font-size: 1rem;
        }
    }
`;

const ErrorText = styled.p`
    color: red;
    margin-top: 8px;
`;
