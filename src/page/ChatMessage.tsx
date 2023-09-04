import socket from 'socket.io-client';
import React, { useState, useEffect, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useLocation, useParams } from 'react-router-dom';

import { Container, Content } from '../theme/theme';
import {
    useChatMessageMutations,
    useGetChatMessageList,
} from '../hooks/chatMessage';
import { userAtom } from '../recoil/authAtom';
import { styled } from 'styled-components';
import { GetMessage } from '../type/chatMessage';
import { useGetChatRoomList } from '../hooks/chatRoom';

export function ChatMessage() {
    const user = useRecoilValue(userAtom);
    const { state } = useLocation();

    const [messageList, setMessageList] = useState<GetMessage[]>();
    const [newMessage, setNewMessage] = useState('');
    const [showProfilePic, setShowProfilePic] = useState(true);

    const { data } = useGetChatMessageList({
        room_id: state.room_id,
        user_id: user!,
        participant_user_id: state.user_id,
    });

    //const { data: roomList } = useGetChatRoomList(user!);

    const { sendMessage } = useChatMessageMutations();

    const messagesContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        console.log('이펰트!!!');

        const socketIO = socket(process.env.REACT_APP_BASE_URL!, {
            query: { user, roomId: state.room_id }, // 사용자 ID를 서버로 전달
        });

        socketIO.on(`${state.room_id} chatMessage`, (data) => {
            console.log('소켓 chatMessage 실행');

            setMessageList(data);
            socketIO.emit('readChatRoomList', user);
            // if (data && Array.isArray(data)) {
            //     const modifiedData = data.map((message: GetMessage) => {
            //         const messageDate = new Date(message.message_date);
            //         const options: Intl.DateTimeFormatOptions = {
            //             hour: '2-digit',
            //             minute: '2-digit',
            //             hour12: true,
            //         };
            //         const formattedTime = messageDate.toLocaleTimeString(
            //             [],
            //             options
            //         );
            //         // message 객체를 변경하고 변경된 객체 반환
            //         return {
            //             ...message,
            //             message_date: formattedTime, // message_date 변경
            //         };
            //     });
            // }
        });

        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => {
            socketIO.off('소켓 chatMessage 종료');
        };
    }, []);

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messageList]);

    // 메시지 입력 핸들러
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value);
    };

    // 메시지 목록이 업데이트될 때 스크롤을 맨 아래로 이동
    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
        }
    };

    const handleSendMessage = () => {
        sendMessage.mutate(
            {
                room_id: state.room_id,
                user_id: user!,
                participant_user_id: state.user_id!,
                message: newMessage,
            },
            {
                onSuccess(data, variables, context) {},
                onError(error, variables, context) {
                    console.log('메세지 전송 error: ', error);
                },
            }
        );
        setNewMessage('');
    };

    return (
        <Container>
            <Content $maxWidth='600px'>
                <ChatContainer>
                    <MessagesContainer>
                        {messageList &&
                            messageList.map(
                                (message: GetMessage, index: number) => (
                                    <Message
                                        key={index}
                                        $isCurrentUser={
                                            message.user_id === user
                                        }
                                    >
                                        {showProfilePic &&
                                            message.user_id !== user && (
                                                <MessageProfile>
                                                    <ProfilePic
                                                        src={
                                                            message.profile_img
                                                        }
                                                        alt='Profile'
                                                    />
                                                    <span>
                                                        {message.nickname}
                                                    </span>
                                                </MessageProfile>
                                            )}
                                        <MessageText
                                            $isCurrentUser={
                                                message.user_id === user
                                            }
                                        >
                                            {message.message}
                                        </MessageText>
                                        {/* {message.user_id === user &&
                                        message.message_status === 'Read' ? (
                                            <p>읽음</p>
                                        ) : (
                                            <p>읽지않음</p>
                                        )} */}

                                        <p>{message.message_date}</p>
                                        <div ref={messagesContainerRef}></div>
                                    </Message>
                                )
                            )}
                    </MessagesContainer>
                    <InputContainer>
                        <Input
                            type='text'
                            placeholder='메시지 입력...'
                            value={newMessage}
                            onChange={handleInputChange}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSendMessage();
                                }
                            }}
                        />
                        <SendButton onClick={handleSendMessage}>
                            전송
                        </SendButton>
                    </InputContainer>
                </ChatContainer>
            </Content>
        </Container>
    );
}

const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 80vh;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
`;

const MessagesContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 10px;
`;

const Message = styled.div<{ $isCurrentUser: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: ${(props) =>
        props.$isCurrentUser ? 'flex-end' : 'flex-start'};
    justify-content: flex-end;
    margin-bottom: 10px;
`;

const ProfilePic = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 5px;
    align-self: flex-start;
`;

const MessageProfile = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
`;

const MessageText = styled.div<{ $isCurrentUser: boolean }>`
    background-color: ${(props) =>
        props.$isCurrentUser ? '#0084ff' : '#e5e5ea'};
    color: ${(props) => (props.$isCurrentUser ? '#fff' : '#333')};
    border-radius: 10px;
    padding: 10px;
    max-width: 70%;
    word-wrap: break-word;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    border-top: 1px solid #ccc;
`;

const Input = styled.input`
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
`;

const SendButton = styled.button`
    background-color: #0084ff;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 8px 15px;
    cursor: pointer;
`;
