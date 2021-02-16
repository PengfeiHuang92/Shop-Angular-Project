import { take, map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable, OnDestroy } from '@angular/core';
import { Product } from '../models/product';
import { SubSink } from 'subsink';
import { ShoppingCart } from '../models/shopping-cart';
import { Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService implements OnDestroy {
  private tableName = '/shoppingCart/'; //table name of database
  private sub = new SubSink(); //deal with uunsubscribe

  constructor(private db: AngularFireDatabase) { }

  // Method: create
  // Description: A data record was made and push into the firebase with current time 
  // Input:  none
  // Output: firebase.database.ThenableReference
  // Preconditions: none
  private create() {
    return this.db.list(this.tableName).push({
      dateCreated: new Date().getTime()
    });
  }
  // Method: getCart
  // Description: return a shoppingCart based on the cartId
  // Input:  none 
  // Output: AngularFireObject<unknown>
  // Preconditions: cartId must be valid
  async getCart(): Promise<AngularFireObject<ShoppingCart> | null> {
    //using await change the return type from "Promise<string | null>" to "string | null"
    let cartId = await this.getOrCreateCartId();
    if (cartId) return this.db.object(this.tableName + cartId)
    return null;
  }

  
  // Method: getOrCreateCartId
  // Description: a async methon that returns a shopping cart id 
  // Input:  none 
  // Output: cartId
  // Preconditions: none
  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      let result = await this.create();
      if (result.key) {
        localStorage.setItem('cartId', result.key);
        return result.key;
      }
    } return cartId;


  }

  // Method: getItem
  // Description: return a fireObject based on the cartId and productId 
  // Input:  cartId, productId 
  // Output: AngularFireObject<unknown>
  // Preconditions: none
  private async getItem(productId: string) {
    let cartId = await this.getOrCreateCartId();
    return this.db.object(this.tableName + cartId + '/items/' + productId);
  }

  // Method: addToCart
  // Description: add product to shopping cart or update shopping cart 
  // Input:  product, productId 
  // Output: none
  // Preconditions: product and productId must be valid
  addToCart(product: Product, productId: string) {
    this.updateQuantity(product, productId, 1);
  }
  removeFromCart(product: Product, productId: string) {
    this.updateQuantity(product, productId, -1);
  }

  private async updateQuantity(product: Product, productId: string, update: number) {
    let cartId = await this.getOrCreateCartId();

    if (cartId) {
      let item$ = await this.getItem(productId);
      this.sub.add(
        item$.snapshotChanges().pipe(take(1)).subscribe(item => {

          //Read the quantitly of the product, if product does not exist in the items list, give a quantity 0 
          let itemQuantity = (item.payload.exists()) ? item.payload.exportVal().quantity : 0;

          //update the shopping item 
          item$.update({ product: product, quantity: itemQuantity + update });
        })
      );
    }
  }




  //unsubscribe
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
