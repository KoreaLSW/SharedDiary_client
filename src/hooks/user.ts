import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getUser, update } from '../api/user';

export function useGetUser(userId: string) {
    return useQuery(['user', userId], () => getUser(userId), {
        refetchOnWindowFocus: false,
        onError: (err) => {
            console.error('getDiaryUserHook: ', err);
        },
    });
}

export function useUserMutations() {
    const queryClient = useQueryClient();

    const updateUserHook = useMutation((user: FormData) => update(user), {
        onSuccess: () => {
            queryClient.invalidateQueries(['user']);
        },
    });

    return {
        updateUserHook,
    };
}
