import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { LoginComponent } from './login/login.component';

export const appRoutes: Routes =[
    { path: 'employee-registration',      component: EmployeeFormComponent },
    { path: 'employee-list',      component: EmployeeListComponent },
    { path: 'login',              component: LoginComponent },
    { path: 'home',              component: HomeComponent },
    { path: '**',                   redirectTo: 'employee-registration', pathMatch: 'full' }
];

// @NgModule({
//   imports: [
//     CommonModule,
//     BrowserModule,
//     RouterModule.forRoot(appRoutes)
//   ],
//   exports: [
//   ],
// })
//export class AppRoutingModule { }
