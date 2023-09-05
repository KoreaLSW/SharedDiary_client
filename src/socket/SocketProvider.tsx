import { createContext, useState, useEffect, useContext } from 'react';
import SocketIO, { io, Socket } from 'socket.io-client';

const SocketContext = createContext<Socket | null>(null);

// 컨텍스트를 사용하기 위한 커스텀 훅
export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({ children }: { children: React.ReactNode }) {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        // Socket.IO 클라이언트를 초기화하고 서버에 연결합니다.
        const newSocket = SocketIO(process.env.REACT_APP_BASE_URL!); // 소켓 서버 URL을 여기에 입력하세요.

        setSocket(newSocket);

        // 컴포넌트 언마운트 시 소켓 연결을 해제합니다.
        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}
