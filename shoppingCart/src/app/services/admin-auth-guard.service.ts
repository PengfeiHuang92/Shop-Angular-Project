import { AppUser } from './../models/app-user';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './user.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { Observable, of} from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(
    private userService:UserService,
    private afAuth: AngularFireAuth,
    private router: Router) { }

   // Return true when user.isAdmin is true, otherwise return false
   canActivate(route?:ActivatedRouteSnapshot,state?:RouterStateSnapshot): Observable<boolean>{
     return this.afAuth.authState
      .pipe(
        switchMap(user => {
          if(user){
            //getting an Obervable<AppUser>
            
            return this.userService.get(user.uid).valueChanges()
            .pipe(
              //getting an AppUser from Obervable<AppUser>
              map((appUser)=>
              {
                //when appUser exist and appUser is admin, return true,
                //otherwise redirected to home page and return false
                if(appUser) { 
                  
                  if(appUser.isAdmin) return true;
                 } 
                 
                this.router.navigate(['']);
                return false;
              }))
          }
          this.router.navigate(['']);
          return of(false);
        }
        )
      );
      
    }

    
    
}
