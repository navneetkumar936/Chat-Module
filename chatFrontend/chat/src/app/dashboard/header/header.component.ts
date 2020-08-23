import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dataService : DataService, public sharedService : SharedService) { }

  ngOnInit() {
  }

  logout(){
    this.sharedService.logout();
  }

}
