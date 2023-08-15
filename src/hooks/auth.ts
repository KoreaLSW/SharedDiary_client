import { useMutation, useQuery, useQueryClient } from 'react-query';
import { login, logout, me, signUp } from '../api/auth';
import { Login, SignUp } from '../type/auth';

export function useMe() {
    return useQuery(['me'], () => me(), {
        refetchOnWindowFocus: false,
        onError: (err) => {
            console.error('me: ', err);
        },
        retry: 1,
    });
}

export function useAuth() {
    const queryClient = useQueryClient();

    const loginHook = useMutation((user: Login) => login(user), {
        onSuccess: () => {
            queryClient.invalidateQueries(['login']);
        },
    });

    const logoutHook = useMutation(() => logout(), {
        onSuccess: () => {
            queryClient.invalidateQueries(['logout']);
        },
    });

    const signUpHook = useMutation((user: SignUp) => signUp(user), {
        onSuccess: () => {
            queryClient.invalidateQueries(['singUp']);
        },
    });

    return { loginHook, logoutHook, signUpHook };
}
