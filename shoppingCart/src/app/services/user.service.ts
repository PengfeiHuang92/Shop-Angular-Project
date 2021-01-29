import { AppUser } from './../models/app-user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private tableName = '/users/';
  constructor(private afAuth: AngularFireAuth, private db:AngularFireDatabase) { }

  //precondition: user must not be empty
  //poscondition: save user into angular firebase Database with tableName
  save(user: firebase.User){
    this.db.object(this.tableName + user.uid).update({
      name: user.displayName,
      email: user.email,

    });
  }
  get(uid:string) : AngularFireObject<AppUser>{
    return this.db.object(this.tableName + uid);
  }
}
