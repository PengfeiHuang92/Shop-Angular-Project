import { ShoppingCartService } from './../services/shopping-cart.service';
import { AppUser } from './../models/app-user';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy {

  //user:any;
  appUser: any;
  //Hamburger button 
  isNavbarCollapsed = true;

  shoppingCartTotalQuantity = 0;
  //SubSink
  private subs = new SubSink();

  constructor(
    //private afAuth: AngularFireAuth,
    private afSevice: AuthenticationService,
    private authService: AuthenticationService,
    private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {

    this.subs.add(
      this.authService.getAppUser().subscribe((appUser: AppUser) => this.appUser = appUser),

      
    );
  
 

   //Wait for the cardId to be created then read the carts
   setTimeout(async ()=>{
    //getting shopping cart 
    let carts$ = await this.shoppingCartService.getCart();
    //counting shopping cart items
 
    this.subs.add(
      carts$.subscribe(cart => this.shoppingCartTotalQuantity = cart.totalItemQuantity));
    },1000);
    


  }
  //calling logout function from AuthenticationService
  logout() {
    this.afSevice.logout();
  }


  hideNav() {
    if (!this.isNavbarCollapsed)
      return this.isNavbarCollapsed = !this.isNavbarCollapsed;
    return null;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
