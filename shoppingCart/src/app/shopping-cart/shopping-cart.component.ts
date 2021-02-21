import { ShoppingCartItem } from './../models/shopping-cart-item';
import { SubSink } from 'subsink';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  productList : ShoppingCartItem[] = [];
  // productIdList : any[]=[];
  productTotalQuantity : number = 0;
  totalPrice : number = 0;
  private subs = new SubSink();
  constructor(private shoppingCartService : ShoppingCartService) { }

  async ngOnInit() {

    //getting shopping cart 
    let cart = await this.shoppingCartService.getCart();
    //updating shoppingCart
    this.subs.add(
      cart.subscribe(cart =>{
          // this.productIdList = Object.keys(cart.items);
          this.productList = cart.items;
          this.productTotalQuantity = 0;
          this.totalPrice = 0
          for (let productId in this.productList) {
            this.productTotalQuantity +=  this.productList[productId].quantity;
            this.totalPrice += (this.productList[productId].price * this.productList[productId].quantity);
          }
        } ));

  }
  

}
