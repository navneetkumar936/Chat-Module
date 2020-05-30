import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ParentDashComponent } from './parent-dash/parent-dash.component';

const routes : Routes = [
    {
        path : '',
        component : ParentDashComponent
    }
]

@NgModule({
    imports : [ RouterModule.forChild(routes) ],
    exports : [RouterModule]
})

export class UserRoutingModule { }