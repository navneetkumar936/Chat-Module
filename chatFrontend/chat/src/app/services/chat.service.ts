import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment as env } from '../../environments/environment';
import { Observable, Observer } from 'rxjs';

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
        this.socket.emit('online', localStorage.getItem('accessToken'));
        this.startListening().subscribe((res:any) => {
            console.log(res);
            
        });
    }

    startListening(){
        return new Observable((observer : Observer<any>) => {
            this.socket.on('msg', (data) => {
                // console.log(data);
                
                observer.next(data);
            })
        })
    }

    disconnectSocket(){
        this.socket.disconnect();
    }

}