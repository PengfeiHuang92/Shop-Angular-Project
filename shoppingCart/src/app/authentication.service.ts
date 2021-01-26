import { Injectable } from '@angular/core';

//FireBase
import {AngularFireAuth } from '@angular/fire/auth';
import  firebase from 'firebase/app';

//Router
import { Router, ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private afAuth: AngularFireAuth, 
    private router:Router,
    private route:ActivatedRoute) { }


  login(){
    //setting the return URL to returnUrl or home page
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    //stored returnUrL into localStorage
    localStorage.setItem('returnUrl',returnUrl);

    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    //after login, redirected to the returnUrl
    .then(()=>{
      let returnUrl = localStorage.getItem('returnUrl');
      //checked if returnUrl is null
      if(returnUrl){
        this.router.navigate([returnUrl]);
      }
    });

  }

  logout(){
    //logout and redirected to home page
    this.afAuth.signOut().then(()=>{
      this.router.navigate(['/']);
    });
    
  }


 
}
