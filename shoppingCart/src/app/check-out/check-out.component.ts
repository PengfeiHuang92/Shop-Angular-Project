import { ShoppingCart } from './../models/shopping-cart';
import { CheckoutService } from './../services/checkout.service';
import { SubSink } from 'subsink';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Order } from '../models/order';
import { AuthenticationService } from '../services/authentication.service';
import { AppUser } from '../models/app-user';


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  orderQuantity = 0;
  orderTotal = 0;
  userId = "";
  shoppingCart = new ShoppingCart({});
 
  private subs = new SubSink();
  //state List
  stateList = ["Alabama", "Alaska", "Alaska", "Arizona","Arkansas","California","Colorado","Connecticut",
    "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky",
    "Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana",
    "Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota",
    "Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota", "Tennessee",
    "Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin"];

  form = new FormGroup({
    firstName: new FormControl('', [
      Validators.required

    ]),
    lastName: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.email
    ]),
    address: new FormControl('', [
      Validators.required
    ]),
    state: new FormControl('', [
      Validators.required
    ]),
    zip: new FormControl('', [
      Validators.required
    ]),
    paymentMethod: new FormControl('Credit', [
      Validators.required
    ]),
    ccName: new FormControl('',[
      Validators.required
    ]),
    ccNumber: new FormControl('',[
      Validators.required
    ]),
    ccExpiration: new FormControl('',[
      Validators.required,

    ]),
    ccCVV: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(4)
    ]),
    
  });

  get firstName() {
    return this.form.get('firstName');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get email() {
    return this.form.get('email');
  }
  get address() {
    return this.form.get('address');
  }
  get state() {
    return this.form.get('state');
  }
  get zip() {
    return this.form.get('zip');
  }
  get paymentMethod() {
    return this.form.get('paymentMethod');
  }
  get ccName() {
    return this.form.get('ccName');
  }
  get ccNumber() {
    return this.form.get('ccNumber');
  }
  get ccExpiration() {
    return this.form.get('ccExpiration');
  }
  get ccCVV() {
    return this.form.get('ccCVV');
  }
  
  constructor(
    private authService: AuthenticationService,
    private checkOutService: CheckoutService,
    private shoppingCartService: ShoppingCartService) { }


  async ngOnInit() {
 
      //getting shopping cart 
      let carts$ = await this.shoppingCartService.getCart();

      this.subs.add(
        carts$.subscribe(cart =>{
          this.shoppingCart.items = cart.items; 
          this.orderQuantity = cart.totalItemQuantity
          this.orderTotal = cart.totalPrice;
        }));
  
  } 
 placeOrder(){
   console.log("userId",this,this.authService.getAppUserId());
   
    if(this.form.valid){
      console.log("clicked");
     
      //let order = new Order(this.userId, this.form.value ,this.shoppingCart);
      let order = {
        datePlaced: new Date().getTime(),
          shipping: {
            address : this.form.value.address,
            firstName : this.form.value.firstName,
            lastName : this.form.value.lastName,
            state : this.form.value.state,
            zip : this.form.value.zip,
          },
          payment:{
            paymentMethod: this.form.value.paymentMethod,
            pName: this.form.value.ccName,
            pCardNumber: this.form.value.ccNumber,
            pExpiration: this.form.value.ccExpiration,
            pCVV: this.form.value.ccCVV
          },
          
        items: this.shoppingCart.items.map(i =>{
          return {
            product:{
              title: i.title,
              price: i.price,
              imgUrl : i.imgUrl
            },
           quantity : i.quantity,
           totalPrice : i.totalPrice
          }
        }
        ),totalPrice : this.shoppingCart.totalPrice
      };
      this.checkOutService.storeOrder(order);
    }
    
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
