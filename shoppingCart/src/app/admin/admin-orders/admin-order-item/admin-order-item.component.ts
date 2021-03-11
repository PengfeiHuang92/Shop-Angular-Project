import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-admin-order-item',
  templateUrl: './admin-order-item.component.html',
  styleUrls: ['./admin-order-item.component.css']
})
export class AdminOrderItemComponent implements OnInit {

  orderList : any ;
  address : string="";
  state : string ="";
  zipCode : number = 0;
  name : string = "";
  subs = new SubSink();
  orderTotalPrice: number = 0;
  oid: any;
  constructor(private route: ActivatedRoute,private orderService: OrderService) { }

  ngOnInit() {
   this.oid = this.route.snapshot.paramMap.get('id');
   
   if(this.oid) this.subs.add(
    this.orderService.getOrder(this.oid).valueChanges()
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
  removeOrder(){
    this.orderService.removeOrder(this.oid);
  }


}
