import { AppUser } from './../models/app-user';
import { Component} from '@angular/core';

import { AngularFireAuth} from "@angular/fire/auth";
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent  {

  //user:any;
  appUser: any;
  //Hamburger button 
  isNavbarCollapsed =true;

  constructor(
    private afAuth: AngularFireAuth,
    private afSevice: AuthenticationService,
    private authService :AuthenticationService) { 
    
   // afAuth.authState.subscribe(user=>{this.user = user;});

    authService.getAppUser().subscribe((appUser:AppUser) => this.appUser= appUser);
  
  }
  
  //calling logout function from AuthenticationService
  logout(){
    this.afSevice.logout();
  }

  hideNav(){
    if(!this.isNavbarCollapsed)
      return this.isNavbarCollapsed  = !this.isNavbarCollapsed;
  }

}
