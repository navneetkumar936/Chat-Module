import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { ChatService } from 'src/app/services/chat.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  loginServerErr = "";
  resendMail = '';
  resendServerErr = "";
  forgotMail = '';
  forgotServerError = '';

  constructor(fb: FormBuilder, public ds: DataService, public router: Router, public chatService : ChatService) {
    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {

  }

  submit(value) {
    if (this.loginForm.valid) {
      this.ds.login(value).subscribe((res: any) => {
        localStorage.setItem('accessToken', res.token);
        this.ds.userProfile().subscribe((data: any) => {
          localStorage.setItem('userData', JSON.stringify(data));
          this.chatService.connectSocket();
          this.router.navigate(['/dashboard']);
        },
          (err: any) => {
            console.log(err);
          })
      },
        (err: any) => {
          this.loginServerErr = err.error.msg;
          console.log(err);
        })
    }
  }

  resend() {
    this.ds.resendVerify({ email: this.resendMail }).subscribe((res: any) => {
      console.log(res);
      $('#myresendModal').modal('hide');
    },
      (err: any) => {
        this.resendServerErr = err.error.msg;
        console.log(err);
      })
  }

  forgotPassword() {
    this.ds.forgotPassword({ email: this.forgotMail }).subscribe((res: any) => {
      console.log(res);
      $('#myforgot-modal').modal('hide');
    },
      (err: any) => {
        this.forgotServerError = err.error.msg;
        console.log(err);
      })
  }

  openForgot() {
    this.forgotMail = '';
    this.forgotServerError = '';
    $('#myforgot-modal').modal('show');
  }

  openResend() {
    this.resendMail = '';
    this.resendServerErr = '';
    $('#myresendModal').modal('show');
  }

}
