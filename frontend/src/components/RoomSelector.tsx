import React, { useEffect, useState } from "react";
import axios from "axios";

interface RoomSelectorProps {
  setRoom: (room: string) => void;
}

const RoomSelector: React.FC<RoomSelectorProps> = ({ setRoom }) => {
  const [rooms, setRooms] = useState<string[]>([]);
  const [newRoomName, setNewRoomName] = useState<string>("");

  // Fetch available rooms from the backend
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/rooms");
        console.log("res.data.rooms", res.data);
        setRooms(res.data.rooms);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRooms();
  }, []);

  // Create a new room
  const createRoom = async () => {
    const roomName = prompt("Enter new room name");

    if (roomName) {
      await axios
        .post("http://localhost:5000/api/rooms", { roomName })
        .then((res) => {
          setRooms([...rooms, roomName]); // Add the new room to the list
          setRoom(roomName); // Automatically join the newly created room
        })
        .catch((err) => {
          alert(err.response.data.message); // Handle room creation failure
        });
    }
  };

  return (
    <div className="bg-[#1C1C1E] p-6 rounded-2xl shadow-lg w-full max-w-md">
      <h1 className="text-2xl font-semibold mb-4 text-center text-zinc">
        Select a room
      </h1>

      <div className="flex flex-row flex-wrap gap-0 mb-2">
        {rooms &&
          rooms.map((room, idx) => (
            <button
              key={idx}
              onClick={() => setRoom(room)}
              className="relative w-24 h-24 bg-[#1C1C1E] text-white p-2 rounded-xl hover:bg-blue-600 transition duration-200"
            >
              {room}
              {/* Extend the borders vertically */}
            
            </button>
          ))}
      </div>

      <button
        onClick={createRoom}
        className="w-full bg-[#007AFF] text-white p-2 rounded-xl hover:bg-blue-600 transition duration-200"
      >
        Create new room
      </button>
    </div>
  );
};

export default RoomSelector;
