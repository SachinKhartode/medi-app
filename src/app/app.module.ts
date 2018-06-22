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

import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component'
import { Employee } from './Shared/employee'
import { EmployeeService } from './Shared/employee-form.service';
import { LoginComponent } from './login/login.component';
import { AuthService } from './Shared/auth.service';
import { HomeComponent } from './home/home.component';

import { DataService } from "./Shared/data.service";
// const appRoutes: Routes = [
//   { path: 'Employee-Form', component: EmployeeFormComponent },
//   { path: 'Employee-List', component: EmployeeListComponent },
// ];

@NgModule({
  declarations: [
    AppComponent,
    EmployeeFormComponent,
    EmployeeListComponent,
    LoginComponent,
    HomeComponent,
    ExporttoexcelComponent
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
  providers: [Employee,EmployeeService, ToasterService,DatePipe,AuthService,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
