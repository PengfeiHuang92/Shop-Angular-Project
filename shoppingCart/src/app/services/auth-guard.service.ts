import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private afAuth:AngularFireAuth, private router: Router) { }
  
 // reutrn true when user is logined, otherwise return false
 canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
  //this.afAuth.authState.subscribe();
  return this.afAuth.authState.pipe(
    map(
      user=>{ 
        if(user) return true;

        //if user is null, then redirected to login in page and show the state url
        this.router.navigate(
          ['/login'],
          { queryParams : {returnUrl: state.url}}
          );
        return false;
    }));
    
  }
 
}
