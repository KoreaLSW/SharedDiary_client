import React, { useState, useEffect } from 'react';
import { Container, Content } from '../theme/theme';
import socket from 'socket.io-client';

export function Message() {
    const socketIO = socket('http://localhost:8080');
    const [messages, setMessages] = useState<any>([]);
    const [messageInput, setMessageInput] = useState('');

    useEffect(() => {
        socketIO.on('message', (data) => {
            console.log('data', data);
        });

        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => {
            socketIO.off('message', handleNewMessage);
        };
    }, []); // 빈 배열을 전달하여 처음 마운트될 때만 실행

    const handleNewMessage = (data: any) => {
        setMessages((prevMessages: any) => [...prevMessages, data]);
    };

    const sendMessage = () => {
        socketIO.emit('message', messageInput);
        setMessageInput('');
    };

    return (
        <Container>
            <Content $maxWidth='1000px'>
                <div>
                    {messages.map((message: any, index: any) => (
                        <div key={index}>{message}</div>
                    ))}
                </div>
                <input
                    type='text'
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </Content>
        </Container>
    );
}
