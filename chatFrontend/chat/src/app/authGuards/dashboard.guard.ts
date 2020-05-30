import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn : 'root' })
export class DashboardAuthGuard implements CanActivate {
    
    constructor( public sharedService : SharedService, public router : Router ) { }

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) : boolean{
        if(localStorage.getItem('accessToken')){
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }
}