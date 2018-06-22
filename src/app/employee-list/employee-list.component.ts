import { Component, OnInit, ViewChild } from '@angular/core';
import { Router} from '@angular/router'
import { ToasterService} from 'angular2-toaster';
import { DataTableResource } from '../data-table';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

import { EmployeeService } from '../Shared/employee-form.service'
import { DataService } from "../Shared/data.service";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  //styles: ['.button-panel[_ngcontent-c4] button[_ngcontent-c4] {height:34px;}']
  styles:['#search,#export {height:30px!important;}']
})

export class EmployeeListComponent implements OnInit {
  public isUserLoggedIn: boolean;
 // @ViewChild(DataTable) empTable:DataTable;
  constructor(private data: DataService, public employeeService:EmployeeService, private router: Router, private toastr: ToasterService) { }
  
  itemCount = 0;
  //employeeList = [];
  itemResource : any//new DataTableResource([]);
  items = [];
  gloabItems = [];
  public search:String = '';//search filter model

  ngOnInit() {

    this.data.currentMessage.subscribe(isUserLoggedIn => this.isUserLoggedIn = isUserLoggedIn)

    if(this.isUserLoggedIn){
      this.getEmployees();
    }
    else
    {
      this.router.navigate(['/login']);
    }

  }

  getEmployees(){
    this.employeeService.getEmployeeList().subscribe(
      data=>{
        this.items = data.json();
        this.gloabItems = this.items;
        this.itemResource = new DataTableResource(data.json());
        this.itemCount = this.items.length;
        // if(this.itemCount > 10){
        //   this.empTable.limit = 10;
        //   this.empTable._triggerReload();
          //}
        // else
        // {this.empTable.limit = this.itemCount;}
      },
      err=>{
        console.log(err);
      }
    )
  }

  reloadItems(params) {//debugger;
    if(this.itemResource !=undefined){
      this.itemResource.query(params).then(items => this.items = items);
      this.items= this.gloabItems;
      this.itemCount = this.gloabItems.length;
      this.search = '';
    }
  }

  onSearch(value:string) {
    this.items = this.gloabItems.filter(item=> item.FirstName.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) >= 0 
     || item.LastName.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) >= 0
     || item.EmpCode.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) >= 0
     || item.Position.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) >= 0
     || item.Office.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) >= 0
    );
   
    this.itemResource = new DataTableResource(this.gloabItems);
    this.itemCount = this.items.length;
    // if(this.itemCount > 10){
    //   this.empTable.limit = 10;
    //   this.empTable._triggerReload();}
    // else
    // {this.empTable.limit = this.itemCount;}
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
    this.router.navigate(['/employee-registration',{id: EmployeeID}]);
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
