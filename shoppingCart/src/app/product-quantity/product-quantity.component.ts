import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input("product") product: any;
  @Input("productId") productId : any;
  @Input("shoppingCart") shoppingCart: any;

  constructor(private shoppingCartService: ShoppingCartService) { }

  // Method: button function "addToCart"
  // Description: calling addToCart function when user clcik on button 
  // Input:  none
  // Output: none
  // Preconditions: a prodoct is added to the shopping cart
  addToCart() {
    this.shoppingCartService.addToCart(this.product,this.productId);
  }

  removeFromCart(){
    this.shoppingCartService.removeFromCart(this.product, this.productId);
  }

  // Method: button function "getQuantity"
  // Description: based on the shoppingCart display product's quantity 
  // Input:  none
  // Output: quantity type number
  // Preconditions: product's quantity is returned 
  getQuantity() : number {
    let quantity = 0;
    //if shoppingCart does not exist, return 0
    if (!this.shoppingCart) return quantity;
    for(let i in this.shoppingCart) {
      if(this.shoppingCart[i].key ===this.productId){
        quantity = this.shoppingCart[i].quantity;
      }
    }
    
    
    //if item does not exit, reutrn 0, otherwaise return item quantity
    return quantity;
  }

}
