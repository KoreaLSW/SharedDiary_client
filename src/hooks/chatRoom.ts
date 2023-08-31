import { useMutation, useQuery, useQueryClient } from 'react-query';
import { create, getChatRoomList, remove, update } from '../api/chatRoom';
import { ChatRoomUsers, UpdateChatTitle } from '../type/chatRoom';

export function useGetChatRoomList(userId: string) {
    const Id = userId ? userId : '';
    console.log('useGetChatRoomList!!');

    return useQuery(['chat', 'chatRoom', Id], () => getChatRoomList(Id), {
        refetchOnWindowFocus: false,
        onError: (err) => {
            console.error('getChatRoomList: ', err);
        },
    });
}

export function useChatRoomMutations() {
    const queryClient = useQueryClient();

    const createChatRoom = useMutation(
        (users: ChatRoomUsers) => create(users),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['chat', 'chatRoom']);
            },
        }
    );

    const removeChatRoom = useMutation(
        (users: ChatRoomUsers) => remove(users),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['chat', 'chatRoom']);
            },
        }
    );

    const updateChatRoomTitle = useMutation(
        (updatechat: UpdateChatTitle) => update(updatechat),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['chat', 'chatRoom']);
            },
        }
    );

    return {
        createChatRoom,
        removeChatRoom,
        updateChatRoomTitle,
    };
}
