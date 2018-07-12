import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {Product} from'./product'

@Injectable()
export class ProductService {

  Product : Product;
  ProductList : Product[];

  constructor(private http : Http) {
    this.Product = null;
   }

  postProduct(prod : Product){
    var body = JSON.stringify(prod);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this.http.post('http://localhost:57980/api/Product',body,requestOptions).map(x => x.json());
  }

  putProduct(id, prod) {
    var body = JSON.stringify(prod);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put('http://localhost:57980/api/Product/' + id,
      body,
      requestOptions).map(res => res.json());
  }
  getProductList(){
    return this.http.get('http://localhost:57980/api/Product');
    // .map((data : Response) =>{
    //   return data.json() as Product[];
    // })
    // .toPromise().then(x => {
    //   this.ProductList = x;
    // }).catch(err =>{
    //   console.log(err);
    // })

    //return this.ProductList;
  }

  getProduct(id:number){
    return this.http.get('http://localhost:57980/api/Product/' + id)
    // .map((data : Response) =>{ 
    //   return data.json();
    // })
    // .toPromise().then(x => {
    //   this.Product = x.json() as Product;
    // }).catch(err =>{
    //   console.log(err);
    // })
    // .subscribe(data => {
    //   this.Product = data.json() as Product;  
    //   return this.Product;
    // }
    // ,err => console.log(err)
    // );
    //return this.Product;
  }

  deleteProduct(id: number) {
    return this.http.delete('http://localhost:57980/api/Product/' + id).map(res => res.json());
  }

  getExpiredProductList(id:number){
    return this.http.get('http://localhost:57980/api/ExpiryProduct/' + id)
  }

}