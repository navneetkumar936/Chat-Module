import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { urls } from '../config';
import { environment as env } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DataService {

    constructor(public http: HttpClient) { }

    login(payload) {
        return this.http.post(`${env.baseUrl}${urls.login}`, payload);
    }

    resendVerify(payload) {
        return this.http.post(`${env.baseUrl}${urls.resendVerify}`, payload);
    }

    forgotPassword(payload) {
        return this.http.post(`${env.baseUrl}${urls.forgotPassword}`, payload);
    }

    resetPwd(payload){
        return this.http.post(`${env.baseUrl}${urls.resetPwd}`, payload);
    }

    verifyUser(token){
        return this.http.get(`${env.baseUrl}${urls.verifyUser}/${token}`);
    }

    verifyPwdToken(token){
        return this.http.get(`${env.baseUrl}${urls.verifyPwdToken}/${token}`);
    }

    register(payload){
        return this.http.post(`${env.baseUrl}${urls.register}`, payload);
    }

}