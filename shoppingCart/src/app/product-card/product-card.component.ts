import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input("product") product:Product | undefined ;
  @Input("showbutton") showbutton: Boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
