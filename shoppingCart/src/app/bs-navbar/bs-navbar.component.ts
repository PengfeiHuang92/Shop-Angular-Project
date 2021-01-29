import { AppUser } from './../models/app-user';
import { Component, OnDestroy} from '@angular/core';

import { AngularFireAuth} from "@angular/fire/auth";
import { AuthenticationService } from '../services/authentication.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnDestroy {

  //user:any;
  appUser: any;
  //Hamburger button 
  isNavbarCollapsed =true;

  //SubSink
  private subs = new SubSink();

  constructor(
    private afAuth: AngularFireAuth,
    private afSevice: AuthenticationService,
    private authService :AuthenticationService) { 
    
   // afAuth.authState.subscribe(user=>{this.user = user;});

    this.subs.add(
      authService.getAppUser().subscribe((appUser:AppUser) => this.appUser= appUser)
    );
  
  }
  
  
  //calling logout function from AuthenticationService
  logout(){
    this.afSevice.logout();
  }


  hideNav(){
    if(!this.isNavbarCollapsed)
      return this.isNavbarCollapsed  = !this.isNavbarCollapsed;
    return null;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
