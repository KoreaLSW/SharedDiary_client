import { useMutation, useQuery, useQueryClient } from 'react-query';

import { create, getAll, getByUserId, remove, update } from '../api/diary';
import { SetDiary, GetDiary } from './../type/diary';

export function useDiaryAll(userId?: string) {
    const id = userId ? userId : '';

    return useQuery([userId], () => getAll(id), {
        refetchOnWindowFocus: false,
        onError: (err) => {
            console.error('getDiaryAllHook: ', err);
        },
    });
}

export function useDiaryUser(userId?: string) {
    const id = userId ? userId : '';

    return useQuery([userId], () => getByUserId(id), {
        refetchOnWindowFocus: false,
        onError: (err) => {
            console.error('getDiaryUserHook: ', err);
        },
    });
}

export function useDiaryMutations() {
    const queryClient = useQueryClient();

    const createDiaryHook = useMutation((diary: SetDiary) => create(diary), {
        onSuccess: () => {
            queryClient.invalidateQueries(['diary']);
        },
    });

    const updateDiaryHook = useMutation(
        (data: { diaryId: string; diary: GetDiary }) => update(data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['diary']);
            },
        }
    );

    const removeDiaryHook = useMutation((diaryId: string) => remove(diaryId), {
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
