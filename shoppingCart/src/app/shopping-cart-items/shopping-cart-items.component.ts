import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';

@Component({
  selector: 'shopping-cart-items',
  templateUrl: './shopping-cart-items.component.html',
  styleUrls: ['./shopping-cart-items.component.css']
})
export class ShoppingCartItemsComponent implements OnInit,OnDestroy {
  shoppingCart : any;
  orderQuantity : number = 0;
  orderTotal : any;
  subs = new SubSink();
  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    //getting shopping cart 
    let carts$ = await this.shoppingCartService.getCart();

    this.subs.add(
      carts$.subscribe(cart => {
        this.shoppingCart = cart.items;
        this.orderQuantity = cart.totalItemQuantity
        this.orderTotal = cart.totalPrice;
      }));
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
