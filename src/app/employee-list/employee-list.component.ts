import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { DataTableResource  } from '../data-table';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

import { Employee } from '../Shared/employee';
import { EmployeeService } from '../Shared/employee-form.service'
import { style } from '@angular/animations';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  //styles: ['.button-panel[_ngcontent-c4] button[_ngcontent-c4] {height:34px;}']
  styles:['#search,#export {height:30px!important;}']
})

export class EmployeeListComponent implements OnInit {

  constructor(public employeeService:EmployeeService, private router: Router, private toastr: ToasterService) { }
  
  itemCount = 0;
  //employeeList = [];
  itemResource : any//new DataTableResource([]);
  items = [];
  gloabItems = [];
  public search:String = '';//search filter model

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(){
    this.employeeService.getEmployeeList().subscribe(
      data=>{
        this.items = data.json();
        this.gloabItems = this.items;
        this.itemResource = new DataTableResource(data.json());
        this.itemCount = this.items.length;
      },
      err=>{
        console.log(err);
      }
    )
  }

  reloadItems(params) {//debugger;
    if(this.itemResource !=undefined){
      this.itemResource.query(params).then(items => this.items = items);
      this.search = '';
    }
  }

  onSearch(value:string) {
    this.items = this.gloabItems.filter(item=> item.FirstName.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) >= 0 
    || item.LastName.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) >= 0
    || item.EmpCode.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) >= 0
    || item.Position.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) >= 0
    || item.Office.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) >= 0);
    this.itemResource = new DataTableResource(this.gloabItems);
    this.itemCount = this.items.length;
  }

  onExport() {debugger;
      var localItems = [];
      var header = ["1","2","3","4","5"]
      var options = { 
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true, 
        showTitle:false,
        useBom: true,
        title: "Employee List",
        headers: header
      };
      
      localItems = this.items;

      for (var i = 0; i < localItems.length; i++) {
          delete localItems[i].EmployeeID
      }

      new Angular2Csv(localItems, 'Employee List', options);
  }

  showForEdit(EmployeeID: number) {
    //this.employeeService.selectedEmployee = Object.assign({}, emp);
    this.router.navigate(['/employee-form',{id: EmployeeID}]);
  }

  addNewEmployee(pageName:string){
    this.router.navigate([pageName])
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.employeeService.deleteEmployee(id)
      .subscribe(x => {
        this.employeeService.getEmployeeList();
        //this.toastr.warning("Deleted Successfully","Employee Register");
        
        this.toastr.pop('success', 'Employee', 'Record Deleted Successfully.');
        
        this.getEmployees();
      })
    }
  }

}
