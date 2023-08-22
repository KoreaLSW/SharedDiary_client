import { useMutation, useQuery, useQueryClient } from 'react-query';

import { create, getAll, getByUserId, remove, update } from '../api/diary';
import { SetDiary, GetDiary, UpdateDiary, DeleteDiary } from './../type/diary';

export function useDiaryAll(userId?: string) {
    const id = userId ? userId : '';

    return useQuery(['diary', userId], () => getAll(id), {
        refetchOnWindowFocus: false,
        onError: (err) => {
            console.error('getDiaryAllHook: ', err);
        },
    });
}

export function useDiaryUser(userId?: string) {
    const id = userId ? userId : '';

    return useQuery(['diary', userId], () => getByUserId(id), {
        refetchOnWindowFocus: false,
        onError: (err) => {
            console.error('getDiaryUserHook: ', err);
        },
    });
}

export function useDiaryMutations() {
    const queryClient = useQueryClient();

    const createDiaryHook = useMutation((diary: FormData) => create(diary), {
        onSuccess: () => {
            queryClient.invalidateQueries(['diary']);
        },
    });

    const updateDiaryHook = useMutation((diary: UpdateDiary) => update(diary), {
        onSuccess: () => {
            queryClient.invalidateQueries(['diary']);
        },
    });

    const removeDiaryHook = useMutation((diary: DeleteDiary) => remove(diary), {
        onSuccess: () => {
            queryClient.invalidateQueries(['diary']);
        },
    });

    return {
        createDiaryHook,
        updateDiaryHook,
        removeDiaryHook,
    };
}
