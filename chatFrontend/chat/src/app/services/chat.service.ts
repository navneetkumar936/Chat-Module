import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment as env } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ChatService {

    socket: SocketIOClient.Socket;

    constructor(){ 
        if(localStorage.getItem('accessToken')){
            this.connectSocket();
        }
    }

    connectSocket(){
        this.socket = io.connect(env.socketUrl);
    }

    disconnectSocket(){
        this.socket.disconnect();
    }

}