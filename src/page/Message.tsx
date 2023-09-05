import React, { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { Container, Content } from '../theme/theme';
import socket from 'socket.io-client';
import { styled } from 'styled-components';
import { useGetChatRoomList } from '../hooks/chatRoom';
import { socketAtome, userAtom } from '../recoil/authAtom';
import { GetChatRoomList } from '../type/chatRoom';
import { useSocket } from '../socket/SocketProvider';
import { Loding } from '../component/Loding';

export function Message() {
    const user = useRecoilValue(userAtom);
    const socketAtom = useRecoilValue(socketAtome);
    const navigate = useNavigate();

    const [messages, setMessages] = useState<any>([]);
    const [messageInput, setMessageInput] = useState('');

    const { data: roomList } = useGetChatRoomList(user!);
    // const socketIO = socket(process.env.REACT_APP_BASE_URL!, {
    //     query: { user }, // 사용자 ID를 서버로 전달
    // });

    const socketIO = useSocket();
    const [messagRoom, setMessageRoom] = useState<GetChatRoomList[]>();

    useEffect(() => {
        console.log('채팅망리스트 이펙트');

        socketIO &&
            socketIO.on(`${user} readChatRoom`, (data) => {
                if (Array.isArray(data)) {
                    console.log(`${user} readChatRoom_1`, data);
                    const modifiedData = data.map(
                        (message: GetChatRoomList) => {
                            const messageDate = new Date(message.message_date);
                            const options: Intl.DateTimeFormatOptions = {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                            };
                            const formattedTime =
                                messageDate.toLocaleTimeString([], options);
                            // message 객체를 변경하고 변경된 객체 반환
                            return {
                                ...message,
                                message_date: formattedTime, // message_date 변경
                            };
                        }
                    );
                    console.log('messageDate', modifiedData);

                    setMessageRoom(modifiedData);
                } else {
                    console.log('roomList 넣음');

                    setMessageRoom(roomList);
                }
            });

        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => {
            socketIO && socketIO.off('소켓 readChatRoom 종료');
        };
    }, []); // 빈 배열을 전달하여 처음 마운트될 때만 실행

    const handleReadMessage = (roomId: number, userId: string) => {
        navigate(`/chat/message/${userId}`, {
            state: {
                user_id: userId,
                room_id: roomId,
            },
        });
    };

    if (!messagRoom) {
        return <Loding />;
    }

    return (
        <Container>
            <Content $maxWidth='1000px'>
                <ChatRoomList>
                    {messagRoom &&
                        messagRoom.map((room: GetChatRoomList) => (
                            <ChatRoom
                                key={room.room_id}
                                onClick={() => {
                                    handleReadMessage(
                                        room.room_id,
                                        room.participant_user_id
                                    );
                                }}
                            >
                                <UserProfile
                                    src={room.profile_img}
                                    alt='Profile'
                                />
                                <UserInfo>
                                    <UserName>
                                        {room.participant_nickname}
                                    </UserName>
                                    <LastMessage>{room.message}</LastMessage>
                                </UserInfo>
                                <div>
                                    <MessageTime>
                                        {room.message_date}
                                    </MessageTime>
                                    {/* {room.unread_count > 0 && (
                                        <UnreadCount>
                                            {room.unread_count}
                                        </UnreadCount>
                                    )} */}
                                </div>
                            </ChatRoom>
                        ))}
                </ChatRoomList>
            </Content>
        </Container>
    );
}

const ChatRoomList = styled.div`
    background-color: #f2f2f2;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 16px;
`;

const ChatRoom = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 1rem;
    margin-bottom: 0.7rem;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const UserProfile = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 16px;
`;

const UserInfo = styled.div`
    flex: 1;
`;

const UserName = styled.div`
    font-weight: bold;
    font-size: 16px;
`;

const LastMessage = styled.div`
    color: #888;
    font-size: 14px;
`;

const MessageTime = styled.div`
    color: #888;
    font-size: 14px;
`;

const UnreadCount = styled.div`
    background-color: #ff5722;
    color: #fff;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 12px;
    text-align: center;
    line-height: 20px;
`;
