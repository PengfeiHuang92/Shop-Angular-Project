import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Category } from '../models/category';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private tableName = "/category/" ;
  constructor(private db: AngularFireDatabase) { }

  //return Catergory with order by child
  getCategory(): AngularFireList<Category>{
    return this.db.list(this.tableName, ref => ref.orderByChild('name'));
  }
}
