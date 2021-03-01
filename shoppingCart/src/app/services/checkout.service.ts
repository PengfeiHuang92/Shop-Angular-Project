import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private tableName = "/order/"
  constructor(private db: AngularFireDatabase) { }

  storeOrder(order:any){
    return this.db.list(this.tableName).push(order);
  }

}
