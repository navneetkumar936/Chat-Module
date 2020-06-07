import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentDashComponent } from './parent-dash/parent-dash.component';
import { ChatComponent } from './chat/chat.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ParentDashComponent, ChatComponent, HeaderComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
