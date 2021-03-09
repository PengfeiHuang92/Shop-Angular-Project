import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OrderService } from 'src/app/services/order.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit,OnDestroy {

  orderList : any;
  id : any;
  dtOptions: DataTables.Settings = {};
  pageLenth = 10 ;
  dtTrigger: Subject<any> = new Subject<any>();
  subsink = new SubSink();
  constructor(
    private orderSerice : OrderService) { 
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: this.pageLenth
    };
  }
  ngOnDestroy(): void {
   this.subsink.unsubscribe();
  }

  ngOnInit(): void {
   
    this.subsink.add(
      this.orderSerice.getAll().snapshotChanges().subscribe(userOrder =>{
      this.orderList =userOrder;
      this.dtTrigger.next();
 
    } )
    )

  }

}
