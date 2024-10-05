import { Socket } from "socket.io";
import redis from "../config/redisConfig";

interface Message {
  username: string;
  message: string;
  timestamp: string;
}

class ChatController {
  private rooms: { [roomName: string]: string[] } = {};

  // Save message to Redis
  public async saveMessage(room: string, message: Message): Promise<void> {
    await redis.rpush(room, JSON.stringify(message));
  }

  // Get chat history from Redis
  public async getChatHistory(room: string): Promise<Message[]> {
    const messages = await redis.lrange(room, 0, -1);
    return messages.map((msg) => JSON.parse(msg));
  }

  // Join room
  public joinRoom(socket: Socket, room: string, username: string): void {
    socket.join(room);
    if (!this.rooms[room]) {
      this.rooms[room] = [];
    }
    this.rooms[room].push(username);
  }

  // Leave room
  public leaveRoom(socket: Socket, room: string, username: string): void {
    socket.leave(room);
    this.rooms[room] = this.rooms[room].filter((user) => user !== username);
  }

  // Broadcast message
  public broadcastMessage(io: Socket, room: string, message: Message): void {
    io.to(room).emit("message", message);
  }

  // Get list of available rooms
  public getAvailableRooms(): string[] {
    return Object.keys(this.rooms);
  }
}

export default new ChatController();
