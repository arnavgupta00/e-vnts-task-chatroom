import React, { useState } from "react";
import RoomSelector from "./components/RoomSelector";
import ChatRoom from "./components/ChatRoom";

function App() {
  const [userName, setUserName] = useState<string>("");
  const [room, setRoom] = useState<string | null>(null);
  const [userNameBool, setUserNameBool] = useState<boolean>(false);

  if (userNameBool === false) {
    return (
      <div className="flex items-center justify-center w-screen min-h-screen bg-black ">
        <div className="bg-[#1C1C1E] p-6 rounded-2xl shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-semibold mb-4 text-center text-zinc">
            Enter your username
          </h1>
          <input
            type="text"
            value={userName}
            placeholder="Type your name..."
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-2 border mb-4 bg-gray-200 text-[#1C1C1E] rounded-xl"
          />
          <button
            onClick={() => setUserNameBool(true)}
            className="w-full bg-[#007AFF] text-white p-2 rounded-xl hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center w-screen min-h-screen bg-black gap-4 ">
        <div className="h-full w-1/2 flex flex-col items-center justify-center ">
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-6xl font-semibold mb-4 text-center text-zinc poppins-semibold">
              Greetings!
            </h1>
            <p className="text-6xl font-semibold mb-4 text-center text-zinc poppins-light">
              {userName}
            </p>
          </div>
        </div>
        <div className="h-full w-1/2 flex flex-col items-start justify-center ">
          <RoomSelector setRoom={setRoom} />
        </div>
      </div>
    );
  }
}

export default App;
