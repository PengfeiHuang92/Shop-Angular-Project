import { Component } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  constructor(private afService: AuthenticationService){}
  
  //calling login function from AuthenticationService
  login(){
    this.afService.login();
  }
}
