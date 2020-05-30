import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  serverError = '';
  public token : any;

  constructor( public ds : DataService, public ar :ActivatedRoute ) { }

  ngOnInit() {
    this.token = this.ar.snapshot.params.token;
    this.verify()
  }

  verify(){
      this.ds.verifyUser(this.token).subscribe((res:any) => {
        console.log(res);
      },
      (err:any) => {
        console.log(err);
        this.serverError = err.error.msg;
      })
  }

}
