import { useMutation, useQuery, useQueryClient } from 'react-query';
import { create, remove } from '../api/diaryLike';
import { DiaryLike } from '../type/diaryLike';

export default function useDiaryLike() {
    const queryClient = useQueryClient();

    // 좋아요 눌럿는지 확인
    // const getCheck = useQuery(
    //     ['diaryLike'],
    //     () => getDiaryLikeCheck(diaryLike),
    //     {
    //         refetchOnWindowFocus: false,
    //         onError: (err) => {
    //             console.error('getDiaryAllHook: ', err);
    //         },
    //     }
    // );

    // 좋아요
    const createLike = useMutation(
        (diaryLike: DiaryLike) => create(diaryLike),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['diary']);
            },
        }
    );

    // 좋아요 취소
    const removeLike = useMutation(
        (diaryLike: DiaryLike) => remove(diaryLike),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['diary']);
            },
        }
    );

    return {
        createLike,
        removeLike,
    };
}
