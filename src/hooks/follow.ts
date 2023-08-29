import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
    create,
    getFollowCheck,
    getFollower,
    getFollowing,
    remove,
} from '../api/follow';
import { Follow } from '../type/follow';

export function useGetFollower(followerId: string) {
    return useQuery(
        ['follow', 'follower', followerId],
        () => getFollower(followerId),
        {
            refetchOnWindowFocus: false,
            onError: (err) => {
                console.error('getDiaryUserHook: ', err);
            },
        }
    );
}

export function useGetFollowing(followingId: string) {
    return useQuery(
        ['follow', 'following', followingId],
        () => getFollowing(followingId),
        {
            refetchOnWindowFocus: false,
            onError: (err) => {
                console.error('getDiaryUserHook: ', err);
            },
        }
    );
}

export function useGetFollowCheck(follow: Follow) {
    return useQuery(
        ['follow', 'followCheck', follow],
        () => getFollowCheck(follow),
        {
            refetchOnWindowFocus: false,
            onError: (err) => {
                console.error('getDiaryUserHook: ', err);
            },
        }
    );
}

export function useFollowMutations() {
    const queryClient = useQueryClient();

    const createFollow = useMutation((follow: Follow) => create(follow), {
        onSuccess: () => {
            queryClient.invalidateQueries(['follow']);
        },
    });

    const removeFollow = useMutation((follow: Follow) => remove(follow), {
        onSuccess: () => {
            queryClient.invalidateQueries(['follow']);
        },
    });

    return {
        createFollow,
        removeFollow,
    };
}
