import { ShoppingCart } from './../models/shopping-cart';
import { AuthenticationService } from './authentication.service';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private tableName = "/order/"
  constructor(
    private db: AngularFireDatabase,
    private auth: AuthenticationService
   
      ) { }

  getUserOrder(){
    let uid = this.auth.getAppUserId();
    return this.db.list(this.tableName,ref => ref.orderByChild('userId').equalTo(uid));
  }

  getOrder(shoppingCartId: string):AngularFireObject<Order>{
    return this.db.object(this.tableName + shoppingCartId );

  }
  getAll(){
    return this.db.list(this.tableName);
  }
}
