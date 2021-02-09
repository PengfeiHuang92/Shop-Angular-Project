import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
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

  getAll():AngularFireList<Product>{
    return this.db.list(this.tableName);
  }
  
  getProduct(id:string):AngularFireObject<Product>{
    return this.db.object(this.tableName + id);
  }

  updateProduct(productId:string,product:Product){
    return this.db.object(this.tableName + productId).update(product);
  }

  deleteProduct(productId:string){
     return this.db.object(this.tableName + productId).remove();
  }
}
