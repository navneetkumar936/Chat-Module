import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ParentDashComponent } from './parent-dash/parent-dash.component';
import { ChatComponent } from './chat/chat.component';

const routes : Routes = [
    {
        path : '',
        component : ParentDashComponent,
        children : [
            {
                path : '',
                component : ChatComponent
            }
        ]
    }
]

@NgModule({
    imports : [ RouterModule.forChild(routes) ],
    exports : [RouterModule]
})

export class DashboardRoutingModule { }