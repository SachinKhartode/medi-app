import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterModule } from 'angular2-toaster';
import { ToasterService } from 'angular2-toaster';
import { DataTableModule } from './data-table';
import { MyDatePickerModule } from './my-date-picker';
import { ExporttoexcelComponent } from  './exporttoexcel.component/exporttoexcel.component';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';
import { NavbarModule } from './Common/navbar/navbar.module';
import { FooterModule } from './Common/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component'
import { ExpiredProductListComponent } from './expired-product-list/expired-product-list.component';
import { Product } from './Shared/Product'
import { ProductService } from './Shared/product.service';
import { LoginComponent } from './login/login.component';
import { AuthService } from './Shared/auth.service';
import { HomeComponent } from './home/home.component';

import { DataService } from "./Shared/data.service";
// const appRoutes: Routes = [
//   { path: 'product-form', component: ProductFormComponent },
//   { path: 'product-list', component: ProductListComponent },
// ];

@NgModule({
  declarations: [
    AppComponent,
    ProductFormComponent,
    ProductListComponent,
    LoginComponent,
    HomeComponent,
    ExporttoexcelComponent,
    ExpiredProductListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ToasterModule, // ToastrModule added
    RouterModule.forRoot(
        appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    //AppRoutingModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    DataTableModule,
    MyDatePickerModule
  ],
  providers: [Product,ProductService, ToasterService,DatePipe,AuthService,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
