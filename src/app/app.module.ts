import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import {HttpModule} from "@angular/http";
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';

import { AppComponent } from './app.component';
import { CarstableComponent } from './component/carstable/carstable.component';
import { ReserveComponent } from './component/reserve/reserve.component';
import { LoginComponent } from './component/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { ReservationComponent } from './component/reservation/reservation.component';
import { EmployeeComponent } from './component/employee/employee.component';
import { Test1Component } from './component/test1/test1.component';


@NgModule({
    declarations: [
        AppComponent,
        CarstableComponent,
        ReserveComponent,
        LoginComponent,
        ReservationComponent,
        EmployeeComponent,
        Test1Component
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        HttpClientModule,
        InputTextModule,
        DialogModule,
        ButtonModule,
        HttpModule,
        AppRoutingModule,
        CalendarModule,
        DropdownModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
