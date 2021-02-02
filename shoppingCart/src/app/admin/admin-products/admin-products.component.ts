import { AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ProductService } from './../../services/product.service';
import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent  {

  products$: Observable<Product>;
  constructor(private productService:ProductService) {
    this.products$ = this.productService.getAll().valueChanges();
   }



}
