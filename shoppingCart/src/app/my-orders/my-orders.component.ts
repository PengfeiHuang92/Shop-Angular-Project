import { AuthenticationService } from './../services/authentication.service';
import { OrderService } from './../services/order.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orderList : any[] =[];
  id : any;
  dtOptions: DataTables.Settings = {};
  pageLenth = 10 ;
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private orderSerice : OrderService,
    private auth: AuthenticationService) { 
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: this.pageLenth
    };
  }

  ngOnInit(): void {
   
    this.orderSerice.getUserOrder().snapshotChanges().subscribe(userOrder =>{
      this.orderList =userOrder;
      this.dtTrigger.next();
 
    } );

  }

}
