import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public registerForm : FormGroup;
  public serverError = '';
  public registerSuccess = false;

  constructor( private fb : FormBuilder, public ds : DataService ) { 
    this.registerForm = fb.group({
      name : ['', Validators.required],
      email : ['', Validators.compose([Validators.required])],
      password : ['', Validators.required],
      confirmPassword : ['', Validators.required],
      contact : ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  submit(value){
    if(this.registerForm.valid){
      this.ds.register(value).subscribe((res:any) => {
        console.log(res);
        this.registerSuccess = true;
      },
      (err:any) => {
        console.log(err);
        this.serverError = err.error.msg;
      })
    }
    
  }

}
