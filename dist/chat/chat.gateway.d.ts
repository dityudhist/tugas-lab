import { ChatService } from './chat.service';
import { Server } from 'http';
import { Socket } from 'socket.io';
export declare class ChatGateway {
    private readonly chatService;
    constructor(chatService: ChatService);
    Server: Server;
    handleConnection(socket: Socket): Promise<void>;
    handleDisconnect(socket: Socket): Promise<void>;
    sendMessage(socket: Socket, data: any): Promise<void>;
}
