import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from 'react-query';

import {
    create,
    getAll,
    getByMonth,
    getByMonthHome,
    getByUserId,
    remove,
    update,
} from '../api/diary';
import {
    SetDiary,
    GetDiary,
    UpdateDiary,
    DeleteDiary,
    SelectDiaryMonth,
} from './../type/diary';

const OFFSET: number = 10;
// export function useDiaryAll(userId?: string) {
//     console.log('useDiaryAll', userId);

//     const id = userId ? userId : '';

//     return useQuery(['diary', userId], () => getAll(id), {
//         refetchOnWindowFocus: false,
//         onError: (err) => {
//             console.error('getDiaryAllHook: ', err);
//         },
//     });
// }

export function useDiaryAll(userId?: string) {
    const id = userId ? userId : '';

    return useInfiniteQuery(
        ['diary', 'all', userId],
        ({ pageParam = 0 }) => getAll(id, pageParam, OFFSET),
        {
            getNextPageParam: (lastPage) => {
                //console.log('lastPage', lastPage.data.nextPage);

                return parseInt(lastPage.data.nextPage) + OFFSET;
            }, // 10씩 증가
            refetchOnWindowFocus: false,
            onError: (err) => {
                console.error('getDiaryAllHook: ', err);
            },
        }
    );
}

export function useDiaryMonthHome(data: SelectDiaryMonth) {
    return useQuery(
        ['diary', 'count', data.month],
        () => getByMonthHome(data),
        {
            refetchOnWindowFocus: false,
            onError: (err) => {
                console.error('getDiaryUserHook: ', err);
            },
        }
    );
}

export function useDiaryMonth(data: SelectDiaryMonth) {
    return useInfiniteQuery(
        ['diary', 'month', data.month],
        ({ pageParam = 0 }) => getByMonth(data, pageParam, OFFSET),
        {
            getNextPageParam: (lastPage) => {
                //console.log('lastPage', lastPage.data.nextPage);

                return parseInt(lastPage.data.nextPage) + OFFSET;
            }, // 10씩 증가
            refetchOnWindowFocus: false,
            onError: (err) => {
                console.error('getDiaryAllHook: ', err);
            },
        }
    );
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
