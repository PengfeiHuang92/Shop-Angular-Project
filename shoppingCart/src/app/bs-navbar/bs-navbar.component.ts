import { Observable } from 'rxjs';
import { Component} from '@angular/core';

import { AngularFireAuth} from "@angular/fire/auth";
import { AuthenticationService } from '../authentication.service';
import firebase from 'firebase/app';
@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent  {

  user:any;
  constructor(private afAuth: AngularFireAuth,private afSevice: AuthenticationService) { 
    
    afAuth.authState.subscribe(user=>{
      this.user = user;
      });
  }
  
  //calling logout function from AuthenticationService
  logout(){
    this.afSevice.logout();
  }


}
