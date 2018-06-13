import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {Employee} from'./employee'

@Injectable()
export class EmployeeService {

  employee : Employee;
  employeeList : Employee[];

  constructor(private http : Http) {
    this.employee = null;
   }

  postEmployee(emp : Employee){
    var body = JSON.stringify(emp);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this.http.post('http://10.173.33.118/my-api/api/Employee',body,requestOptions).map(x => x.json());
  }

  putEmployee(id, emp) {
    var body = JSON.stringify(emp);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put('http://10.173.33.118/my-api/api/Employee/' + id,
      body,
      requestOptions).map(res => res.json());
  }
  getEmployeeList(){
    return this.http.get('http://10.173.33.118/my-api/api/Employee');
    // .map((data : Response) =>{
    //   return data.json() as Employee[];
    // })
    // .toPromise().then(x => {
    //   this.employeeList = x;
    // }).catch(err =>{
    //   console.log(err);
    // })

    //return this.employeeList;
  }

  getEmployee(id:number){
    return this.http.get('http://10.173.33.118/my-api/api/Employee/' + id)
    // .map((data : Response) =>{ debugger;
    //   return data.json();
    // })
    // .toPromise().then(x => {
    //   this.employee = x.json() as Employee;
    // }).catch(err =>{
    //   console.log(err);
    // })
    // .subscribe(data => {
    //   this.employee = data.json() as Employee;  
    //   return this.employee;
    // }
    // ,err => console.log(err)
    // );
    //return this.employee;
  }

  deleteEmployee(id: number) {
    return this.http.delete('http://10.173.33.118/my-api/api/Employee/' + id).map(res => res.json());
  }
}