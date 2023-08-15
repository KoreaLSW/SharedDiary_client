import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { Login } from '../type/auth';
import { login } from '../api/auth';
import { userAtom } from '../recoil/authAtom';
import { useAuth } from '../hooks/auth';

export function LoginPage() {
    const navigate = useNavigate();
    const { loginHook } = useAuth();
    const setUserAtom = useSetRecoilState(userAtom);

    const [user, setUser] = useState<Login>({
        user_id: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        //const { files } = e.target as HTMLInputElement;
        setUser((res) => ({ ...res, [name]: value }));
    };

    const useSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginHook.mutate(user, {
            onSuccess(data, variables, context) {
                console.log('signUpSuccess data', data);
                console.log('signUpSuccess variables', variables);
                console.log('signUpSuccess context', context);
                setUserAtom(variables.user_id as any);
                navigate('/');
            },
            onError(error: any, variables, context) {
                console.log('signUpError', error);
                alert(error.response.data.message);
            },
        });
    };
    return (
        <LoginPageContainer>
            <div>
                <h1>로그인</h1>
                <form onSubmit={useSubmit}>
                    <input
                        name='user_id'
                        type='text'
                        placeholder='아이디를 입력해주세요'
                        onChange={handleChange}
                        maxLength={12}
                        value={user.user_id ?? ''}
                    />
                    <input
                        name='password'
                        type='password'
                        placeholder='비밀번호를 입력해주세요'
                        onChange={handleChange}
                        maxLength={20}
                        value={user.password ?? ''}
                    />
                    <button>Login</button>
                </form>

                <Link className='signup' to='/signup'>
                    SignUp
                </Link>
            </div>
        </LoginPageContainer>
    );
}

const LoginPageContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

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
    }

    button {
        width: 100%;
        padding: 0.8rem 1rem;
        margin-bottom: 0.5rem;
        border-radius: 0.3rem;
        border: none;
        background-color: ${(props) => props.theme.colors.signature};
        color: #ffffff;
        font-weight: bold;
    }

    .signup {
        font-size: 0.8rem;
        color: #bbc1c6;
        text-decoration: underline;
        text-underline-offset: 5px;
    }
`;
