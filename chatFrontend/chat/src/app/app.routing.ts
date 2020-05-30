import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserAuthGuard } from './authGuards/userAuth.guard';
import { DashboardAuthGuard } from './authGuards/dashboard.guard';

const routes : Routes = [
    {
        path : '',
        loadChildren : './user-auth/user-auth.module#UserAuthModule',
        canActivate:[UserAuthGuard]
    },
    {
        path : 'dashboard',
        loadChildren : './dashboard/dashboard.module#DashboardModule',
        canActivate:[DashboardAuthGuard]
    }
]

@NgModule({
    imports : [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
    exports : [RouterModule]
})

export class AppRoutingModule { }