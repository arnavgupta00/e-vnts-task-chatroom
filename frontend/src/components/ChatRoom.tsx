import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

interface ChatRoomProps {
    username: string;
    room: string;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ username, room }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        socket.emit('joinRoom', { username, room });

        socket.on('message', (message) => {
            setMessages((prev) => [...prev, message]);
        });

        socket.on('chatHistory', (history) => {
            setMessages(history);
        });

        return () => {
            socket.emit('leaveRoom', { username, room });
        };
    }, [username, room]);

    const sendMessage = () => {
        if (message) {
            socket.emit('message', { username, room, message });
            setMessage('');
        }
    };

    return (
        <div>
            <h2>Chat Room: {room}</h2>
            <div>
                {messages.map((msg, idx) => (
                    <div key={idx}>
                        <strong>{msg.username}</strong>: {msg.message}
                    </div>
                ))}
            </div>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatRoom;
