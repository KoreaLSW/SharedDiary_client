import { useMutation, useQuery, useQueryClient } from 'react-query';
import { create, getComment, remove } from '../api/comment';
import { SetComments, RemoveComments } from '../type/comment';

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

    const createComment = useMutation(
        (comments: SetComments) => create(comments),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['comments']);
            },
        }
    );

    const removeComment = useMutation(
        (comments: RemoveComments) => remove(comments),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['comments']);
            },
        }
    );

    return {
        createComment,
        removeComment,
    };
}
