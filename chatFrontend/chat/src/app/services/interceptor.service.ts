import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, Subject, ObservableInput, throwError } from 'rxjs';
import { catchError, switchMap, finalize, map } from "rxjs/operators";
import { DataService } from './data.service';
import { SharedService } from './shared.service';
import { urls } from '../config';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class InterceptorService implements HttpInterceptor {

    phpBaseUrl = environment.baseUrl;
   
    private _refreshSubject: Subject<any> = new Subject<any>();

    constructor(public dataService: DataService, public sharedService: SharedService, public router: Router) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!localStorage.getItem('accessToken')) {
            return next.handle(req);            
        }
        else{
            return next.handle(this.updateHeader(req));
        }
    }

    updateHeader(req) {
        const authToken = localStorage.getItem('accessToken');
        req = req.clone({
            headers: req.headers.set("Authorization", `Bearer ${authToken}`)
        });
        return req;
    }
}