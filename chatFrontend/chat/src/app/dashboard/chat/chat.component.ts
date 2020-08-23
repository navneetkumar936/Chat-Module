import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild("searchEle", {static : false}) searchEle : ElementRef;

  public search = '';
  public setTimeId : any;
  public searchArr : any;

  constructor( public ds : DataService, private renderer: Renderer2, public cS : ChatService ) { }

  ngOnInit() {
    this.renderer.listen('window', 'click', (e: Event) => {
        if (!this.searchEle.nativeElement.contains(e.target))  {
          this.searchArr = [];
          this.search = '';
        }
    });
  }

  searchUser(){
    this.setTimeId = setTimeout(() => {
      this.ds.searchUser(this.search).subscribe((res:any) => {
        console.log(res);
        this.searchArr = res;
      },
      (err) => {
        console.log(err);
      })
    }, 2000);
  }
  
  keyUp(){
    clearTimeout(this.setTimeId);
    this.searchUser();
  }

  selectUser(user){
    this.search = '';
    this.searchArr = [];
  }

}
