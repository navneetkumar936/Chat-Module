import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetForm : FormGroup;
  token = '';
  serverError = '';
  tokenVerifyError = '';

  constructor( public fb : FormBuilder, public ds : DataService, public ar :ActivatedRoute, public router : Router ) { 
    this.resetForm = fb.group({
      password : ['', Validators.required],
      confirmPassword : ['', Validators.required],
      token:['', Validators.required]
    })
  }

  ngOnInit() {
    this.token = this.ar.snapshot.params.id;
    this.resetForm.patchValue({token : this.token});
    this.verifyToken(this.token);
  }

  verifyToken(token){
    this.ds.verifyPwdToken(token).subscribe((res:any) => {
      console.log(res);
    },
    (err:any) => {
      console.log(err);
      this.tokenVerifyError = err.error.msg;
    })
  }

  reset(value){
    if(this.resetForm.valid){
      this.ds.resetPwd(value).subscribe((res:any) => {
        console.log(res);
        this.router.navigate(['/'])
      },
      (err:any) => {
        console.log(err);
        this.serverError = err.error.msg;
      })
    }
  }

}
