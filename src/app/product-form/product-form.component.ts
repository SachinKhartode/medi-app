import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import {ToasterService} from 'angular2-toaster';
import {IMyDpOptions} from '../my-date-picker';

import { Product } from '../Shared/Product';
import { ProductService } from '../Shared/product.service'


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
  //providers:[ProductService]
})


export class ProductFormComponent implements OnInit {

  //submitted = false;
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mm-yyyy',
  };

  constructor(public Product:Product,
    private ProductService: ProductService, 
    private route: ActivatedRoute,
    private toastr: ToasterService
  ) { 
    }

  ngOnInit() {
      //params['id']
      //var ProductID = 0;
      //this.route.queryParams.subscribe(params => {      
      //ProductID = this.route.params['id']; 
      var ProductID = this.route.snapshot.params['id'];
      //});
      if(ProductID != null){
         this.ProductService.getProduct(ProductID).subscribe(data => {
            this.Product = data.json() as Product;  
            //this.Product.ExpiryDate = { date: { year: this.Product.ExpiryDate, month: this.Product.ExpiryDate, day: this.Product.ExpiryDate } };

            this.setDates(this.Product);
          }
          ,err => console.log(err)
          );
      }
      else{
        this.resetForm();
        //this.Product.DOB = new Date();
        //this.setDates(this.Product);
      }
  }

  resetForm(form?: NgForm)
  {
    this.Product = new Product();

    if (form != null)
    form.reset();
    this.Product.PurchaseDate = { date: { year: new Date().getFullYear(), month: new Date().getDay()+1, day: new Date().getDate() } };
    // this.ProductService.Product = {
    //   ProductID: null,
    //   FirstName: '',
    //   LastName: '',
    //   EmpCode: '',
    //   Position: '',
    //   Office: ''
    // }
  }

  onSubmit(form: NgForm) {
    //this.submitted = true;
    if(form.value.PurchaseDate!=undefined){
      form.value.PurchaseDate = form.value.PurchaseDate.jsdate;
    }
    
    if(form.value.PurchaseDate!=undefined){
      form.value.ManufacturingDate = form.value.ManufacturingDate.jsdate;
    }

    if(form.value.PurchaseDate!=undefined){
      form.value.ExpiryDate = form.value.ExpiryDate.jsdate;
    }
    
    if (form.value.ProductID == null) {      
      this.ProductService.postProduct(form.value)
        .subscribe(data => {
          this.resetForm(form);
          //this.ProductService.getProductList();
          //this.toastr.success('Record Added Succcessfully', 'Product Register');
          
          this.toastr.pop('success', 'Success', 'Record Added Successfully.');

        },
        err => { 
          console.log(err);
          this.toastr.pop('error', 'Fail', 'Please check Web Api is running.');
          this.toastr.pop('error', 'Fail', 'Failed to save record.');
        });
    }
    else {
      this.ProductService.putProduct(form.value.ProductID, form.value)
      .subscribe(data => {
        this.resetForm(form);
        //this.ProductService.getProductList();
       // this.toastr.info('Record Updated Successfully!', 'Product Register');
        //alert("Record Updated Succcessfully");
        this.toastr.pop('success', 'Success', 'Record Updated Successfully.');
      },
      err => { 
        console.log(err);
        this.toastr.pop('error', 'Fail', 'Please check Web Api is running.');
        this.toastr.pop('error', 'Fail', 'Failed to save record.');
      });
    }
  }
  
  // TODO: Remove this when we're done
  //get diagnostic() { return JSON.stringify(this.model); }

  setDates(product:Product){
    if(this.Product.PurchaseDate !=null){
      this.Product.PurchaseDate = { 
        date: { 
            year: new Date(product.PurchaseDate).getFullYear(), 
            month: new Date(product.PurchaseDate).getMonth()+1, 
            day: new Date(product.PurchaseDate).getDate()
        } 
      };
    }

    if(product.ManufacturingDate !=null){
      this.Product.ManufacturingDate = { 
        date: { 
          year: new Date(product.ManufacturingDate).getFullYear(), 
          month: new Date(product.ManufacturingDate).getMonth()+1, 
          day: new Date(product.ManufacturingDate).getDate()
        } 
      };
    }

    if(product.ExpiryDate !=null){
      this.Product.ExpiryDate = { 
        date: {
          year: new Date(product.ExpiryDate).getFullYear(), 
          month: new Date(product.ExpiryDate).getMonth()+1, 
          day: new Date(product.ExpiryDate).getDate()
        } 
      };
    }
  }
 

}
