import { Injectable } from "@angular/core";
import { ChatService } from './chat.service';
import { Router } from '@angular/router';

@Injectable({providedIn : 'root'})
export class SharedService {

    constructor( public chatService : ChatService, public router : Router ) { }

    logout(){
        localStorage.clear();
        this.chatService.disconnectSocket();
        this.router.navigate(['/'])
    }

}