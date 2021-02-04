import { SubSink } from 'subsink';
import { ProductService } from './../../services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy,OnInit  {

  products:any[]=[];

  private subs = new SubSink();

  //Data Tables
  dtOptions: DataTables.Settings = {};
  persons: Product[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  pageLenth = 10 ;
  constructor(private productService:ProductService) {  }

  ngOnInit(): void {
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: this.pageLenth
    };

    //Get Product list from ProductService
    this.subs.add(
      this.productService.getAll()
      .snapshotChanges()
      .subscribe( p=>{
        this.products = p;
        this.dtTrigger.next();
      })
    );

  }

   ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
