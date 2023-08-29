import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getType, login, logout, me, signUp, update } from '../api/auth';
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

export function useType(type: string) {
    return useQuery([type], () => getType(type), {
        refetchOnWindowFocus: false,
        onError: (err) => {
            console.error('useType: ', err);
        },
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

    const signUpHook = useMutation((user: FormData) => signUp(user), {
        onSuccess: () => {
            queryClient.invalidateQueries(['singUp']);
        },
    });

    const updateHook = useMutation((user: FormData) => update(user), {
        onSuccess: () => {
            queryClient.invalidateQueries(['user']);
        },
    });

    return { loginHook, logoutHook, signUpHook, updateHook };
}
