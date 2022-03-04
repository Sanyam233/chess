import { useState, useEffect, useContext, createContext } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
}

const SocketProvider = (props) => {

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io("http://localhost:5000");
        setSocket(newSocket);
        return () => newSocket.close();
    }, []);
    return (
        <SocketContext.Provider value = {{ socket }}>
            {props.children}
        </SocketContext.Provider>
    );    
}

export default SocketProvider;