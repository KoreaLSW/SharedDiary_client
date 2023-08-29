import { useMutation, useQuery, useQueryClient } from 'react-query';
import { DiaryLike } from '../type/diaryLike';
import { create, remove } from '../api/commentLike';
import { CommentLike } from '../type/commentLike';

export default function useCommentLike() {
    const queryClient = useQueryClient();

    // 좋아요
    const createLike = useMutation(
        (commentLike: CommentLike) => create(commentLike),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['diary']);
            },
        }
    );

    // 좋아요 취소
    const removeLike = useMutation(
        (commentLike: CommentLike) => remove(commentLike),
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
