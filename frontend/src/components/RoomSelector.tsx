import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface RoomSelectorProps {
    setRoom: (room: string) => void;
}

const RoomSelector: React.FC<RoomSelectorProps> = ({ setRoom }) => {
    const [rooms, setRooms] = useState<string[]>([]);

    useEffect(() => {
        axios.get('/api/rooms').then((res) => setRooms(res.data.rooms));
    }, []);

    return (
        <div>
            <h2>Available Rooms</h2>
            <ul>
                {rooms.map((room) => (
                    <li key={room} onClick={() => setRoom(room)}>
                        {room}
                    </li>
                ))}
            </ul>
            <button onClick={() => setRoom(prompt('Enter new room name') || '')}>Create Room</button>
        </div>
    );
};

export default RoomSelector;
