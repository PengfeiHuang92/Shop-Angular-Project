import { SubSink } from 'subsink';
import { switchMap,map} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UserService } from './user.service';
import { Injectable, OnDestroy } from '@angular/core';

//FireBase
import {AngularFireAuth } from '@angular/fire/auth';
import  firebase from 'firebase/app';

//Router
import { Router, ActivatedRoute, CanActivate } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnDestroy{
  private subs = new SubSink();

  constructor(
    private afAuth: AngularFireAuth, 
    private router:Router,
    private route:ActivatedRoute,
    private userService: UserService) { 
      
    }
 

  login(){
    //setting the return URL to returnUrl or home page
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    //stored returnUrL into localStorage
    localStorage.setItem('returnUrl',returnUrl);

    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    //after login, save user to the database and redirected to the returnUrl 
    .then(()=>{

      //Getting user and call userService to save user information
      this.subs.add(
        this.afAuth.authState.subscribe(user => {
          if(user) this.userService.save(user);
        })
      ); 
        
      //redurected user to the returnUrl
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

  //Return an Obeservable AppUser when user exist, otherwise return Obeservable Null
  getAppUser(): Observable<any> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if(user){
          return this.userService.get(user.uid).valueChanges()
          .pipe(
            map(user => {return user})
          );
        }
        return of(null);
      })
    );
  }

  getAppUserId(){
  
   this.afAuth.authState.subscribe(user=> user?.uid)
  return "";
}
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
