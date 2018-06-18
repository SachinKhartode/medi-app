import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterModule } from 'angular2-toaster';
import { ToasterService } from 'angular2-toaster';
import { DataTableModule } from './data-table';
import { MyDatePickerModule } from './my-date-picker';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';
import { NavbarModule } from './Common/navbar/navbar.module';
import { FooterModule } from './Common/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component'
import { Employee } from './Shared/employee'
import { EmployeeService } from './Shared/employee-form.service';

// const appRoutes: Routes = [
//   { path: 'Employee-Form', component: EmployeeFormComponent },
//   { path: 'Employee-List', component: EmployeeListComponent },
// ];

@NgModule({
  declarations: [
    AppComponent,
    EmployeeFormComponent,
    EmployeeListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
  providers: [Employee,EmployeeService, ToasterService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
