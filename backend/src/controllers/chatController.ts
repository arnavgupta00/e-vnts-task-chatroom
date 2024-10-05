import { Socket } from "socket.io";
import redis from "../config/redisConfig";

// Define the Message type
interface Message {
  username: any;
  message: any;
  timestamp: string;
}

class ChatController {
  private rooms: { [roomName: string]: string[] } = {
    General: [],
    Random: [],
    News: [],
    Tech: [],
    Games: [],
    Movies: [],
    Music: [],
    Sports: [],
    Books: [],
    Science: [],

  };

  // Save message to Redis
  public async saveMessage(room: string, message: Message): Promise<void> {
    await redis.rpush(room, JSON.stringify(message));
  }

  // Get chat history from Redis
  public async getChatHistory(room: string): Promise<Message[]> {
    const messages = await redis.lrange(room, 0, -1);
    return messages.map((msg) => JSON.parse(msg));
  }

  // Join or create a new room
  public joinRoom(socket: Socket, room: string, username: string): void {
    socket.join(room);

    // Create room if it doesn't exist
    if (!this.rooms[room]) {
      this.rooms[room] = [];
    }

    this.rooms[room].push(username);
  }

  // Leave room
  public leaveRoom(socket: Socket, room: string, username: string): void {
    socket.leave(room);
    this.rooms[room] = this.rooms[room].filter((user) => user !== username);

    // If room is empty, delete the room
    if (this.rooms[room].length === 0) {
      delete this.rooms[room];
    }
  }

  // Broadcast message to room
  public broadcastMessage(io: Socket, room: string, message: Message): void {
    io.to(room).emit("message", message);
  }

  // Get list of available rooms
  public getAvailableRooms(): string[] {
    return Object.keys(this.rooms);
  }

  // Create a new room
  public createRoom(room: string): boolean {
    if (!this.rooms[room]) {
      this.rooms[room] = [];
      return true;
    }
    return false;
  }
}

export default new ChatController();
