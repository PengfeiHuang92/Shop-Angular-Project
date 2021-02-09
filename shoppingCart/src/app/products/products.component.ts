import { switchMap } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { ActivatedRoute } from '@angular/router';

import { CategoryService } from './../services/category.service';
import { ProductService } from './../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  productList: any[] = [];
  filterProduct: any[] = [];
  
  category: string  = "";
  private subs = new SubSink();
  constructor(
    private productService: ProductService,
    private categortyService: CategoryService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.subs.add(
      this.productService.getAll()
        .snapshotChanges().pipe(
          //Get Product list from ProductService
          switchMap(p => {
            this.productList = p;
            return this.route.queryParamMap
          })
        )
        //Get filterProduct List based on the category
        .subscribe(params => {
          //Get the current selected category
          let category = params.get('category');
          //If category does not exist, give it empty string
          this.category = (category) ? this.category = category : this.category="";
          //Show the filterProduct bBased on the category 
          this.filterProduct = (this.category) ?
            this.productList.filter(product => product.payload.val().category == this.category) :
            this.productList;
        })
    );
    
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
