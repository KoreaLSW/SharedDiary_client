import socket from 'socket.io-client';
import React, { useState, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { useLocation, useParams } from 'react-router-dom';

import { Container, Content } from '../theme/theme';
import {
    useChatMessageMutations,
    useGetChatMessageList,
} from '../hooks/chatMessage';
import { userAtom } from '../recoil/authAtom';
import { styled } from 'styled-components';
import { GetMessage } from '../type/chatMessage';

export function ChatMessage() {
    const user = useRecoilValue(userAtom);
    const { state } = useLocation();

    const socketIO = socket(process.env.REACT_APP_BASE_URL!);

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [showProfilePic, setShowProfilePic] = useState(true);

    const { data } = useGetChatMessageList({
        room_id: state.room_id,
        user_id: user!,
        participant_user_id: state.user_id,
    });
    const { sendMessage } = useChatMessageMutations();

    const messagesContainerRef = useRef<HTMLDivElement | null>(null);

    data && console.log('메시지 리스트', data);

    useEffect(() => {
        socketIO.on('chatMessage', (data) => {
            console.log('소켓 chatMessage 실행', data);
        });

        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => {
            socketIO.off('소켓 chatMessage 종료');
        };
    }, [sendMessage]); // 빈 배열을 전달하여 처음 마운트될 때만 실행

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
                user_id: user!,
                participant_user_id: state.user_id!,
                message: newMessage,
            },
            {
                onSuccess(data, variables, context) {},
                onError(error, variables, context) {},
            }
        );
        setNewMessage('');
    };

    return (
        <Container>
            <Content $maxWidth='550px'>
                <ChatContainer>
                    <MessagesContainer ref={messagesContainerRef}>
                        {data.data.map((message: GetMessage, index: number) => (
                            <Message
                                key={index}
                                isCurrentUser={message.user_id === user}
                            >
                                {showProfilePic && message.user_id !== user && (
                                    <ProfilePic
                                        src={`profile_${message.user_id}.jpg`}
                                        alt='Profile'
                                    />
                                )}
                                <MessageText
                                    isCurrentUser={message.user_id === user}
                                >
                                    {message.message}
                                </MessageText>
                            </Message>
                        ))}
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
    height: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
`;

const MessagesContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 10px;
`;

const Message = styled.div<{ isCurrentUser: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: ${(props) =>
        props.isCurrentUser ? 'flex-end' : 'flex-start'};
    margin-bottom: 10px;
`;

const ProfilePic = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 5px;
    align-self: flex-start;
`;

const MessageText = styled.div<{ isCurrentUser: boolean }>`
    background-color: ${(props) =>
        props.isCurrentUser ? '#0084ff' : '#e5e5ea'};
    color: ${(props) => (props.isCurrentUser ? '#fff' : '#333')};
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
