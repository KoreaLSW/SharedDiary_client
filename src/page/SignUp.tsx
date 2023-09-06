import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { SignUp } from '../type/auth';
import { signUp } from '../api/auth';
import { useAuth } from '../hooks/auth';
import { userSelector } from '../recoil/authAtom';

const idRegex: RegExp = /^[a-z0-9]+$/i;
const passwordRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const emailRegex: RegExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
const nickRegex: RegExp = /^(?:[aeiouAEIOUㄱ-ㅎㅏ-ㅣ]*[a-zA-Z가-힣0-9])*$/;
const introductionRegex: RegExp =
    /^[a-zA-Z가-힣0-9!@#$%^&*(),.?":{}|<>\n\\ ]+$/;

const formData = new FormData();

export function SignUpPage() {
    const { signUpHook } = useAuth();
    const navigate = useNavigate();
    const isLogin = useRecoilValue(userSelector);

    const [avatar, setAvatar] = useState<File>();
    const [signup, setSignup] = useState<SignUp>({
        user_id: '',
        password: '',
        nickname: '',
        email: '',
        birthday: '',
    });
    const [passwordCheck, setPasswordCheck] = useState<string>('');

    useEffect(() => {
        // 로그인되어있으면 홈으로
        if (isLogin) {
            navigate('/');
        }
    }, [isLogin]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        e.preventDefault();
        const { name, value } = e.target;
        //const { files } = e.target as HTMLInputElement;
        if (name === 'passwordCheck') {
            setPasswordCheck(value);
            return;
        }
        setSignup((res) => ({ ...res, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];

        // 이미지 업로드 전에 초기화
        formData.delete('profile-image');
        file && formData.append('profile-image', file);
        file && setAvatar(file);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!idRegex.test(signup.user_id)) {
            alert('아이디는 영어(소문자)와 숫자만 가능합니다');
            return;
        }
        if (!passwordRegex.test(signup.password)) {
            alert(
                '비밀번호는 최소 8자이상 영어 대문자와 소문자 및 숫자가 포함되어있어야합니다.'
            );
            return;
        }

        if (signup.password !== passwordCheck) {
            alert('비밀번호가 일치하지않습니다.');
            return;
        }

        if (!nickRegex.test(signup.nickname)) {
            alert('닉네임은 한글, 영어, 숫자만 가능합니다.');
            return;
        }

        if (!emailRegex.test(signup.email)) {
            alert('이메일을 확인해주세요');
            return;
        }

        formData.delete('signup');
        formData.append('signup', JSON.stringify(signup));

        signUpHook.mutate(formData, {
            onSuccess(data, variables, context) {
                console.log('signUpSuccess data', data);
                console.log('signUpSuccess variables', variables);
                console.log('signUpSuccess context', context);

                navigate('/login');
            },
            onError(error: any, variables, context) {
                console.log('signUpError', error);
                alert(error.response.data.message);
            },
        });
    };
    return (
        <SignUpContainer>
            <div>
                <h1>회원가입</h1>
                {avatar && <Avatar src={URL.createObjectURL(avatar)} />}

                <form onSubmit={handleSubmit}>
                    <input
                        type='file'
                        accept='image/*'
                        onChange={handleFileChange}
                    />
                    <input
                        name='user_id'
                        type='text'
                        placeholder='아이디를 입력해주세요(필수)(최대 12자)'
                        maxLength={12}
                        onChange={handleChange}
                        required
                        value={signup.user_id ?? ''}
                    />
                    <input
                        name='password'
                        type='password'
                        placeholder='비밀번호를 입력해주세요(필수)(최대 20자)'
                        maxLength={20}
                        onChange={handleChange}
                        required
                        value={signup.password ?? ''}
                    />
                    <input
                        name='passwordCheck'
                        type='password'
                        placeholder='비밀번호를 한번더 입력해주세요(필수)(최대 20자)'
                        onChange={handleChange}
                        required
                        value={passwordCheck ?? ''}
                    />
                    <input
                        name='nickname'
                        type='text'
                        placeholder='닉네임를 입력해주세요(필수)(최대 8자)'
                        maxLength={8}
                        onChange={handleChange}
                        required
                        value={signup.nickname ?? ''}
                    />
                    <input
                        name='email'
                        type='email'
                        placeholder='이메일을 입력해주세요(필수)'
                        maxLength={30}
                        onChange={handleChange}
                        required
                        value={signup.email ?? ''}
                    />
                    <input
                        name='birthday'
                        type='date'
                        data-placeholder='생일을 입력해주세요(필수)'
                        min='1930-01-01'
                        required
                        aria-required='true'
                        onChange={handleChange}
                        value={signup.birthday ?? ''}
                    />
                    <textarea
                        name='introduction'
                        rows={5}
                        placeholder='자기소개를 입력해주세요(선택)(최대 2000자)'
                        maxLength={2000}
                        onChange={handleChange}
                        value={signup.introduction ?? ''}
                    />
                    <button>SignUp</button>
                </form>
            </div>
        </SignUpContainer>
    );
}

const SignUpContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow-y: scroll;

    div {
        width: 30rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    h1 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }

    form {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    form input {
        border: none;
        margin-bottom: 0.5rem;
        border-radius: 0.3rem;
        background-color: #f6f7f9;
        padding: 0.8rem 1rem;
        ime-mode: disabled;
    }

    form textarea {
        border: none;
        margin-bottom: 0.5rem;
        border-radius: 0.3rem;
        background-color: #f6f7f9;
        padding: 0.8rem 1rem;
        resize: none;
    }

    input[type='date']::before {
        content: attr(data-placeholder);
        width: 100%;
    }

    input[type='date']:focus::before,
    input[type='date']:valid::before {
        display: none;
    }

    form button {
        width: 100%;
        padding: 0.8rem 1rem;
        margin-bottom: 0.5rem;
        border-radius: 0.3rem;
        border: none;
        background-color: ${(props) => props.theme.colors.signature};
        color: #ffffff;
        font-weight: bold;
        cursor: pointer;
    }

    @media (max-width: 768px) {
        padding-bottom: 5rem;
        div {
            width: 90%;
        }

        form input {
            width: 100%;
        }
    }
`;

const Avatar = styled.img`
    width: 10rem;
    height: 10rem;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
        width: 5rem;
        height: 5rem;
    }
`;
