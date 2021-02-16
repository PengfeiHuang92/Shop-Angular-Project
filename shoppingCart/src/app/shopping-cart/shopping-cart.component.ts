import { SubSink } from 'subsink';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  productList : any[] = [];
  productIdList : string[]=[];
  productTotalQuantity : number = 0;
  totalPrice : number = 0;
  private subs = new SubSink();
  constructor(private shoppingCartService : ShoppingCartService) { }

  async ngOnInit() {

    //getting shopping cart 
    let cart = await this.shoppingCartService.getCart();
    //updating shoppingCart
    this.subs.add(
      cart?.snapshotChanges()
        .subscribe(cart =>{
          this.productIdList =Object.keys(cart.payload.exportVal().items);
          this.productList = cart.payload.exportVal().items;
          for (let productId in this.productList) {
            this.productTotalQuantity +=  this.productList[productId].quantity;
            this.totalPrice += (this.productList[productId].product.price * this.productList[productId].quantity);
          }
          
        } ));

  }
  

}
