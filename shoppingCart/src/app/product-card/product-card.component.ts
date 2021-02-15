import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input("product") product: any;
  @Input("showbutton") showbutton: Boolean = false;
  @Input("shoppingCart") shoppingCart: any;
  itemQuantity = 0;
  constructor(private shoppingCartService: ShoppingCartService) { }

  // Method: button function "addToCart"
  // Description: calling addToCart function when user clcik on button 
  // Input:  none
  // Output: none
  // Preconditions: a prodoct is added to the shopping cart
  addToCart() {
    this.shoppingCartService.addToCart(this.product.payload.val(), this.product.key);
  }

  removeFromCart(){
    this.shoppingCartService.removeFromCart(this.product.payload.val(), this.product.key);
  }

  // Method: button function "getQuantity"
  // Description: based on the shoppingCart display product's quantity 
  // Input:  none
  // Output: quantity type number
  // Preconditions: product's quantity is returned 
  getQuantity() : number {

    //if shoppingCart does not exist, return 0
    if (!this.shoppingCart) return 0;

    let item = this.shoppingCart[this.product.key];

    //if item does not exit, reutrn 0, otherwaise return item quantity
    return item ? item.quantity : 0;
  }

}
