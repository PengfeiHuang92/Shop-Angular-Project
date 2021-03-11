
import { AuthenticationService } from './authentication.service';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { take, map } from 'rxjs/operators';
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

  getOrder(OrderId: string):AngularFireObject<Order>{
    return this.db.object(this.tableName + OrderId );
  }
  getAll(){
    return this.db.list(this.tableName);
  }
  removeOrder(orderId: string){
    return this.db.object(this.tableName + orderId).remove();
  }

 
}
