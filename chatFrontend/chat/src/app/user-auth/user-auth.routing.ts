import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyComponent } from './verify/verify.component';

const routes : Routes = [
    {
        path : '',
        component : LoginComponent
    },
    {
        path : 'register',
        component : SignupComponent
    },
    {
        path : 'resetPassword/:id',
        component : ResetPasswordComponent
    },
    {
        path : 'verify/:token',
        component : VerifyComponent
    }
]

@NgModule({
    imports : [ RouterModule.forChild(routes) ],
    exports : [RouterModule]
})

export class UserRoutingModule { }