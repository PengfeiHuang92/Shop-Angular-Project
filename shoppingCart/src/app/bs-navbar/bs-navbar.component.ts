import { ShoppingCartService } from './../services/shopping-cart.service';
import { AppUser } from './../models/app-user';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { AngularFireAuth } from "@angular/fire/auth";
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
  //shopping cart total quantity
  shoppingCartTotalQuantity: number = 0;
  //SubSink
  private subs = new SubSink();

  constructor(
    //private afAuth: AngularFireAuth,
    private afSevice: AuthenticationService,
    private authService: AuthenticationService,
    private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.subs.add(
      this.authService.getAppUser().subscribe((appUser: AppUser) => this.appUser = appUser));

    //getting shopping cart 
    let cart = await this.shoppingCartService.getCart();
    //updating shoppingCart
    this.subs.add(
      cart?.snapshotChanges()
        .subscribe(cart => {
          this.shoppingCartTotalQuantity = 0;
          for (let productId in cart.payload.exportVal().items) {
            this.shoppingCartTotalQuantity += cart.payload.exportVal().items[productId].quantity;
          }

        }
        ));


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
