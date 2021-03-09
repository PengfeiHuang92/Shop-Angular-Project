import { PaymentInfo } from './../../models/paymentInfo';
import { Order } from './../../models/order';
import { ShoppingCart } from './../../models/shopping-cart';
import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {
  orderList : any ;
  address : string="";
  state : string ="";
  zipCode : number = 0;
  name : string = "";
  
  orderTotalPrice: number = 0;
  constructor(private route: ActivatedRoute,private orderService: OrderService) { }

  ngOnInit() {
   let oid = this.route.snapshot.paramMap.get('id');
   
   if(oid) this.orderService.getOrder(oid).valueChanges()
  //  .pipe(
  //    map(e => {
  //      if(e){
  //       return new Order(e.userId, e.shipping,e.paymentInfo,e.shoppingCart,e.email)
  //      }
  //      return null;
  //    })
  //  )
   .subscribe( c => {
     if(c){
       this.orderTotalPrice = c.orderTotalPrice;
       this.orderList =c.shoppingCart.items;
       this.name = c.shipping.firstName +" "+ c.shipping.LastName;
       this.address = c.shipping.address;
       this.state = c.shipping.state;
       this.zipCode = c.shipping.zip;
      }});

   

  }

}
