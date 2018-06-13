import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

export const appRoutes: Routes =[
    { path: 'employee-form',      component: EmployeeFormComponent },
    { path: 'employee-list',      component: EmployeeListComponent },
    { path: '**',                   redirectTo: 'employee-form', pathMatch: 'full' }
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
