import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ExpiredProductListComponent } from './expired-product-list/expired-product-list.component';
import { LoginComponent } from './login/login.component';

export const appRoutes: Routes =[
    { path: 'product-registration',      component: ProductFormComponent },
    { path: 'product-list',      component: ProductListComponent },
    { path: 'expired-product-list',      component: ExpiredProductListComponent },
    { path: 'login',              component: LoginComponent },
    { path: 'home',              component: HomeComponent },
    { path: '**',                   redirectTo: 'product-registration', pathMatch: 'full' }
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
