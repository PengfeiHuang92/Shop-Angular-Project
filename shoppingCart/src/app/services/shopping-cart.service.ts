import { Category } from './../models/category';
import { take, map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable, OnDestroy } from '@angular/core';
import { Product } from '../models/product';
import { SubSink } from 'subsink';
import { ShoppingCart } from '../models/shopping-cart';
import { Observer, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService implements OnDestroy {
  private tableName = '/shoppingCart/'; //table name of database
  private sub = new SubSink(); //deal with uunsubscribe

  constructor(private db: AngularFireDatabase) { }


  // Method: getCart
  // Description: return a shoppingCart based on the cartId
  // Input:  none 
  // Output: AngularFireObject<unknown>
  // Preconditions: cartId must be valid
  async getCart(): Promise<Observable<ShoppingCart>> {
    //using await change the return type from "Promise<string | null>" to "string | null"
    let cartId = await this.getOrCreateCartId();

    return this.db.object(this.tableName + cartId).snapshotChanges()
    .pipe(map(x=>new ShoppingCart(x.payload.exportVal()?.items)));;
  }
  
  // Method: addToCart
  // Description: product quantity plus one
  // Input:  product, productId 
  // Output: none
  // Preconditions: product and productId must be valid
  addToCart(product: Product, productId: string) {
    this.updateQuantity(product, productId, 1);
  }
  // Method: removeFromCart
  // Description: product quantity remove one
  // Input:  product, productId 
  // Output: none
  // Preconditions: product and productId must be valid
  removeFromCart(product: Product, productId: string) {
    this.updateQuantity(product, productId, -1);
  }
  async emptyCart(){
    let cartId = await this.getOrCreateCartId()
    this.db.object(this.tableName + cartId).remove();
  }

  
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


  // Method: updateQuantity
  // Description: update product from the shopping cart
  // Input:  product, productId and update
  // Output: none
  // Preconditions: product and productId must be valid, update must be a number
  private async updateQuantity(product: Product, productId: string, update: number) {
    let cartId = await this.getOrCreateCartId();
    console.log("cartID",cartId);
    if (cartId) {
      let item$ = await this.getItem(productId);
      this.sub.add(
        item$.snapshotChanges().pipe(take(1)).subscribe(item => {

          //Read the quantitly of the product, if product does not exist in the items list, give a quantity 0 
          let itemQuantity = (item.payload.exists()) ? item.payload.exportVal().quantity : 0;

          //update the shopping item 
         item$.update({ 
           title: product.title,
           category: product.category,
           imgUrl: product.imgUrl,
           price: product.price,
           quantity: itemQuantity + update });
          
          // remove a existential item from the shopping cart when quantity is 0 
          if( item.payload.exists() && itemQuantity + update === 0){
            item$.remove();
           }
        })

       
      );
    }
  }




  //unsubscribe
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
