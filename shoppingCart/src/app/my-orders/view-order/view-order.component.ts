import { PaymentInfo } from './../../models/paymentInfo';
import { Order } from './../../models/order';
import { ShoppingCart } from './../../models/shopping-cart';
import { OrderService } from './../../services/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { SubSink } from 'subsink';

@Component({
  selector: 'view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit,OnDestroy {
  orderList : any ;
  address : string="";
  state : string ="";
  zipCode : number = 0;
  name : string = "";
  subs = new SubSink();
  orderTotalPrice: number = 0;
  constructor(private route: ActivatedRoute,private orderService: OrderService) { }

  ngOnInit() {
   let oid = this.route.snapshot.paramMap.get('id');
   
   if(oid) this.subs.add(
    this.orderService.getOrder(oid).valueChanges()
    .subscribe( c => {
      if(c){
        this.orderTotalPrice = c.orderTotalPrice;
        this.orderList =c.shoppingCart.items;
        this.name = c.shipping.firstName +" "+ c.shipping.LastName;
        this.address = c.shipping.address;
        this.state = c.shipping.state;
        this.zipCode = c.shipping.zip;
       }})
   );
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
