import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getChatMessageList, sendChatMessage } from '../api/chatMessage';
import { SelectMessage, sendMessage } from '../type/chatMessage';

export function useGetChatMessageList(selectMessage: SelectMessage) {
    console.log('useGetChatMessageList!!');

    return useQuery(
        ['chat', 'message', selectMessage],
        () => getChatMessageList(selectMessage),
        {
            refetchOnWindowFocus: false,
            onError: (err) => {
                console.error('getChatMessageList: ', err);
            },
        }
    );
}

export function useChatMessageMutations() {
    const queryClient = useQueryClient();

    const sendMessage = useMutation(
        (send: sendMessage) => sendChatMessage(send),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['chat', 'message', 'chatRoom']);
            },
        }
    );

    return {
        sendMessage,
    };
}
