import { Component, OnInit, ViewChild } from '@angular/core';
import { Router} from '@angular/router'
import { ToasterService} from 'angular2-toaster';
import { DataTableResource } from '../data-table';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { DatePipe } from '@angular/common';

import { ProductService } from '../Shared/product.service'
import { DataService } from "../Shared/data.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  //styles: ['.button-panel[_ngcontent-c4] button[_ngcontent-c4] {height:34px;}']
  styles:['#search,#export {height:34px!important;}']
})

export class ProductListComponent implements OnInit {
  public isUserLoggedIn: boolean;
 // @ViewChild(DataTable) empTable:DataTable;
  constructor(private data: DataService, 
    public productService:ProductService, 
    private router: Router, 
    private toastr: ToasterService,
    private datepipe: DatePipe) { this.getProducts();}
  
  itemCount = 0;
  //ProductList = [];
  itemResource : any//new DataTableResource([]);
  items = [];
  gloabItems = [];
  exportItems = [];
  public search:String = '';//search filter model

  ngOnInit() {

    this.data.currentMessage.subscribe(isUserLoggedIn => this.isUserLoggedIn = isUserLoggedIn)

    if(this.isUserLoggedIn){
      this.getProducts();
    }
    else
    {
      this.router.navigate(['/login']);
    }

  }

  getProducts(){
    this.productService.getProductList().subscribe(
      data=>{
        this.items = data.json();
        this.gloabItems = this.items;
        this.itemResource = new DataTableResource(data.json());
        this.itemCount = this.items.length;

        this.setExportData();
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

  setExportData(){
    this.exportItems = JSON.parse(JSON.stringify(this.items));
    
    for (var i = 0; i < this.exportItems.length; i++) {
      delete this.exportItems[i].ProductID;
      delete this.exportItems[i].Active;

      this.exportItems[i].PurchaseDate = this.datepipe.transform(this.exportItems[i].PurchaseDate, 'dd-MM-yyyy')
      this.exportItems[i].ManufacturingDate = this.datepipe.transform(this.exportItems[i].ManufacturingDate, 'dd-MM-yyyy')
      this.exportItems[i].ExpiryDate = this.datepipe.transform(this.exportItems[i].ExpiryDate, 'dd-MM-yyyy')
    }
  }

  reloadItems(params) {
    if(this.itemResource !=undefined){
      this.itemResource.query(params).then(items => this.items = items);
      this.items= this.gloabItems;
      this.itemCount = this.gloabItems.length;
      this.search = '';
      this.setExportData();
    }
  }

  onSearch(value:string) {
    this.items = this.gloabItems.filter(item=> item.ProductName.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) >= 0 
     || item.ProductCategory.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) >= 0
     || item.Company.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) >= 0
     || item.Comments.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) >= 0
     || this.datepipe.transform(item.PurchaseDate, 'dd-MM-yyyy').toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) >= 0
     || this.datepipe.transform(item.ManufacturingDate, 'dd-MM-yyyy').toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) >= 0
     || this.datepipe.transform(item.ExpiryDate, 'dd-MM-yyyy').toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) >= 0
    );
    
    this.itemResource = new DataTableResource(this.gloabItems);
    this.itemCount = this.items.length;
    this.setExportData();
    // if(this.itemCount > 10){
    //   this.empTable.limit = 10;
    //   this.empTable._triggerReload();}
    // else
    // {this.empTable.limit = this.itemCount;}
  }

  // onExport() {
  //     var localItems = [];
  //     var header = ["1","2","3","4","5"]
  //     var options = { 
  //       fieldSeparator: ',',
  //       quoteStrings: '"',
  //       decimalseparator: '.',
  //       showLabels: true, 
  //       showTitle:false,
  //       useBom: true,
  //       title: "Product List",
  //       headers: header
  //     };
      
  //     localItems = this.items;

  //     for (var i = 0; i < localItems.length; i++) {
  //         delete localItems[i].ProductID
  //     }

  //     new Angular2Csv(localItems, 'Product List', options);
  // }

  showForEdit(ProductID: number) {
    //this.productService.selectedProduct = Object.assign({}, emp);
    this.router.navigate(['/product-registration',{id: ProductID}]);
  }

  addNewProduct(pageName:string){
    this.router.navigate([pageName])
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.productService.deleteProduct(id)
      .subscribe(x => {
        this.productService.getProductList();
        //this.toastr.warning("Deleted Successfully","Product Register");
        
        this.toastr.pop('success', 'Product', 'Record Deleted Successfully.');
        
        this.getProducts();
      },
      err => { 
        console.log(err);
        this.toastr.pop('error', 'Fail', 'Please check Web Api is running.');
        this.toastr.pop('error', 'Fail', 'Failed to delete record.');
      });
    }
  }

}
