import React, { useState, useEffect } from 'react';
import { useLongPress } from 'use-long-press';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { Container, Content } from '../theme/theme';
import socket from 'socket.io-client';
import { styled } from 'styled-components';
import { useChatRoomMutations, useGetChatRoomList } from '../hooks/chatRoom';
import { socketAtome, userAtom } from '../recoil/authAtom';
import { GetChatRoomList } from '../type/chatRoom';
import { useSocket } from '../socket/SocketProvider';
import { Loding } from '../component/Loding';

type RemoveChatRoom = {
    user_id: string;
    participant_user_id: string;
};

export function Message() {
    const user = useRecoilValue(userAtom);
    const socketAtom = useRecoilValue(socketAtome);
    const navigate = useNavigate();

    const [messages, setMessages] = useState<any>([]);
    const [messageInput, setMessageInput] = useState('');
    const [selectDeleteMsgId, setSelectDeleteMsgId] = useState<RemoveChatRoom>({
        user_id: '',
        participant_user_id: '',
    });

    const { data: roomList } = useGetChatRoomList(user!);
    const { removeChatRoom } = useChatRoomMutations();

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
                            if (message.message_date) {
                                const formatDate = formatMessageDate(
                                    message.message_date
                                );
                                console.log(
                                    'message.message_date',
                                    message.message_date
                                );
                                console.log('formatDate1_2', formatDate);

                                return {
                                    ...message,
                                    message_date: formatDate, // message_date 변경
                                };
                            } else {
                                const formatDate = formatMessageDate(
                                    message.create_date
                                );
                                console.log(
                                    'message.message_date',
                                    message.message_date
                                );
                                console.log('formatDate2_2', formatDate);
                                return {
                                    ...message,
                                    message_date: formatDate, // message_date 변경
                                };
                            }
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

    const callback = React.useCallback(() => {
        console.log('szdfsdsdgsdg', selectDeleteMsgId);
        const { user_id, participant_user_id } = selectDeleteMsgId;
        const result = window.confirm(
            '해당 채팅방을 삭제하시겠습니까? \n삭제한 메세지는 복구가 불가능합니다.'
        );
        if (result) {
            removeChatRoom.mutate(
                {
                    user_id,
                    participant_user_id,
                },
                {
                    onSuccess(data, variables, context) {
                        alert('채팅방 삭제 완료');
                    },
                    onError(error, variables, context) {},
                }
            );
        }
    }, [selectDeleteMsgId]);

    const onDeleteMsg = useLongPress(callback, {
        onStart: (e, meta: any) => setSelectDeleteMsgId(meta.context), //누른것이 시작되면 호출되는 함수
        threshold: 500, // press 시간 /ms 초 단위이다.
        captureEvent: true, // 첫번째 인자로 들어온 callback 함수가 react MouseEvent를 도와주게 설정
        cancelOnMovement: false, // 확실하진않지만 꾹 눌렀다가 옆으로 이동했을때 취소여부 옵션인것같다
    });

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
                                {...onDeleteMsg({
                                    user_id: user,
                                    participant_user_id:
                                        room.participant_user_id,
                                })}
                                key={room.room_id}
                                onClick={() => {
                                    handleReadMessage(
                                        room.room_id,
                                        room.participant_user_id
                                    );
                                }}
                            >
                                <UserProfile
                                    src={
                                        room.profile_img
                                            ? room.profile_img
                                            : '/noprofile.jpg'
                                    }
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

export function formatMessageDate(messageSandDate: string) {
    const messageDate = new Date(messageSandDate);
    const today = new Date();

    // 현재 날짜와 message_date의 날짜 부분만 가져옵니다.
    const currentDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );
    console.log('messageDate', messageDate);
    console.log('currentDate', currentDate);

    const messageDateOnly = new Date(
        messageDate.getFullYear(),
        messageDate.getMonth(),
        messageDate.getDate()
    );
    console.log('messageDateOnly', messageDateOnly);

    // 현재 날짜와 message_date를 비교
    if (currentDate <= messageDateOnly) {
        const options: Intl.DateTimeFormatOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'Asia/Seoul',
        };
        return messageDate.toLocaleTimeString([], options);
    } else {
        return messageSandDate;
    }
}
