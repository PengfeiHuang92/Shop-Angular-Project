import { CheckOutValidators } from './../Validators/check-out.validators';
import { PaymentInfo } from './../models/paymentInfo';
import { ShoppingCart } from './../models/shopping-cart';
import { CheckoutService } from './../services/checkout.service';
import { SubSink } from 'subsink';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Order } from '../models/order';
import { AuthenticationService } from '../services/authentication.service';
import { AppUser } from '../models/app-user';
import { Shipping } from '../models/shipping';
import { Router } from '@angular/router';


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  orderQuantity = 0;
  orderTotal = 0;
  buttonClicked: boolean = false;
  currentYear = new Date().getFullYear();
  shoppingCart = new ShoppingCart({});

  private subs = new SubSink();
  //state List
  stateList = ["Alabama", "Alaska", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
    "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana",
    "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
    "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee",
    "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin"];
  monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  yearList: number[] = [];
  form = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
    address: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required]),
    paymentMethod: new FormControl('Credit', [Validators.required]),
    ccName: new FormControl('', [Validators.required]),
    ccNumber: new FormControl('', [Validators.required,Validators.minLength(15),CheckOutValidators.onlyContainNumber]),
    ccMonth: new FormControl('', [Validators.required]),
    ccYear: new FormControl('', [Validators.required]),
    ccCVV: new FormControl('', [Validators.required,Validators.minLength(3),CheckOutValidators.onlyContainNumber])

  },[]);

  get firstName() { return this.form.get('firstName'); }
  get lastName() { return this.form.get('lastName'); }
  get email() { return this.form.get('email'); }
  get address() { return this.form.get('address'); }
  get state() { return this.form.get('state'); }
  get zip() { return this.form.get('zip'); }
  get paymentMethod() { return this.form.get('paymentMethod'); }
  get ccName() { return this.form.get('ccName'); }
  get ccNumber() { return this.form.get('ccNumber'); }
  get ccMonth() { return this.form.get('ccMonth'); }
  get ccYear() { return this.form.get('ccYear'); }
  get ccCVV() { return this.form.get('ccCVV'); }

  constructor(
    private router : Router,
    private authService: AuthenticationService,
    private checkOutService: CheckoutService,
    private shoppingCartService: ShoppingCartService) { }


  async ngOnInit() {


    for (let i = 0; i < 10; i++) {
      this.yearList.push(this.currentYear + i);
    }
    //getting shopping cart 
    let carts$ = await this.shoppingCartService.getCart();

    this.subs.add(
      carts$.subscribe(cart => {
        this.shoppingCart.items = cart.items;
        this.orderQuantity = cart.totalItemQuantity
        this.orderTotal = cart.totalPrice;
      }));

  }
  placeOrder() {
    this.buttonClicked = true;
    // console.log(this.form);

    if (this.form.valid) {
    
      let formValue = this.form.value;
      let order : any;
      let shipping = new Shipping(formValue.firstName , formValue.lastName, formValue.address, formValue.state, formValue.zip);
      let paymentInfo = new PaymentInfo(formValue.ccName, formValue.ccNumber, formValue.ccMonth, formValue.ccYear, formValue.ccCVV);
      let uid = this.authService.getAppUserId();
      
      if(uid){
        order = new Order(uid, shipping, paymentInfo, this.shoppingCart, formValue?.email);
      }else{
        //if user has not sign in, used cartId for userId
        uid= localStorage.getItem("cartId");
        if(uid) order = new Order(uid, shipping, paymentInfo, this.shoppingCart, formValue?.email);
      }
        let result = this.checkOutService.storeOrder(order);
        this.buttonClicked = false;
        this.shoppingCartService.emptyCart();
       
        this.router.navigate(['/order-success',result.key]);
        this.form.reset();
      
      
    }

  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
