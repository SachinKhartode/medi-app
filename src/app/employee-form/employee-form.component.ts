import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import {ToasterService} from 'angular2-toaster';
import {IMyDpOptions} from '../my-date-picker';

import { Employee } from '../Shared/employee';
import { EmployeeService } from '../Shared/employee-form.service'


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
  //providers:[EmployeeService]
})


export class EmployeeFormComponent implements OnInit {

  //submitted = false;
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mm-yyyy',
  };

  Positions = ['Software', 'Finance', 'HR', 'Admin'];

  constructor(public employee:Employee,
    private employeeService: EmployeeService, 
    private route: ActivatedRoute,
    private toastr: ToasterService
  ) { 
    }

  ngOnInit() {debugger;
      //params['id']
      //var employeeID = 0;
      //this.route.queryParams.subscribe(params => {      
      //employeeID = this.route.params['id']; 
      var employeeID = this.route.snapshot.params['id'];
      //});
      if(employeeID != null){
         this.employeeService.getEmployee(employeeID).subscribe(data => {
            this.employee = data.json() as Employee;  
            this.employee.DOB = { date: { year: this.employee.DOB, month: this.employee.DOB, day: this.employee.DOB } };
          }
          ,err => console.log(err)
          );
      }
      else{
        this.resetForm();
        //this.employee.DOB = new Date();
        this.employee.DOB = { date: { year: this.employee.DOB, month: this.employee.DOB, day: this.employee.DOB } };
 
      }
  }

  resetForm(form?: NgForm)
  {
    this.employee = new Employee();

    if (form != null)
    form.reset();

    // this.employeeService.employee = {
    //   EmployeeID: null,
    //   FirstName: '',
    //   LastName: '',
    //   EmpCode: '',
    //   Position: '',
    //   Office: ''
    // }
  }

  onSubmit(form: NgForm) {
    
    //this.submitted = true;
    debugger;
    if (form.value.EmployeeID == null) {
      this.employeeService.postEmployee(form.value)
        .subscribe(data => {
          this.resetForm(form);
          //this.employeeService.getEmployeeList();
          //this.toastr.success('Record Added Succcessfully', 'Employee Register');
          
          this.toastr.pop('success', 'Employee', 'Record Added Successfully.');

        })
    }
    else {
      this.employeeService.putEmployee(form.value.EmployeeID, form.value)
      .subscribe(data => {
        this.resetForm(form);
        //this.employeeService.getEmployeeList();
       // this.toastr.info('Record Updated Successfully!', 'Employee Register');
        //alert("Record Updated Succcessfully");
        this.toastr.pop('success', 'Employee', 'Record Updated Successfully.');

      });
    }
  }
  
  // TODO: Remove this when we're done
  //get diagnostic() { return JSON.stringify(this.model); }

  
 

}
