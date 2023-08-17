import { useMutation, useQuery, useQueryClient } from 'react-query';
import { create, getComment, remove } from '../api/comment';
import { CreateComments, RemoveComments } from '../type/comment';

export function useGetComment(userId: string | undefined, diaryId: string) {
    const Id = userId ? userId : '';
    console.log('useGetComment!!');

    return useQuery(['comments', diaryId], () => getComment(Id, diaryId), {
        refetchOnWindowFocus: false,
        onError: (err) => {
            console.error('getCommentHook: ', err);
        },
    });
}

export function useCommentMutations() {
    const queryClient = useQueryClient();

    const createCommentHook = useMutation(
        (comments: CreateComments) => create(comments),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['comments']);
            },
        }
    );

    const removeCommentHook = useMutation(
        (comments: RemoveComments) => remove(comments),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['comments']);
            },
        }
    );

    return {
        createCommentHook,
        removeCommentHook,
    };
}
