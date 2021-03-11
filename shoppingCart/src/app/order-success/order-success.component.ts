import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  orderId:any ;
  constructor(private router: ActivatedRoute,private modalService: NgbModal) { }

  ngOnInit(): void {
   this.orderId =  this.router.snapshot.paramMap.get("id");


  }
  open() {
    const modalRef = this.modalService.open(OrderSuccessComponent);
    modalRef.componentInstance.name = 'World';
  }
}
export class NgbdModalContent {
 

  constructor(public activeModal: NgbActiveModal) {}
}
