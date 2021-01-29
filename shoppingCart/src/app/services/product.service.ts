import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private tableName = "/products/"
  constructor(private db: AngularFireDatabase) { }

  create(product:Product){
    return this.db.list(this.tableName).push(product);
  }
}
