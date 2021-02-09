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
  categoryList: any[] = [];
  category: string | null = "";
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
          this.category = params.get('category');

          this.filterProduct = (this.category) ?
            this.productList.filter(product => product.payload.val().category == this.category) :
            this.productList;
        })
    );
    //Get Product list from ProductService

    this.subs.add(
      this.categortyService.getCategory().subscribe(category => {
        if (category) this.categoryList = category;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
