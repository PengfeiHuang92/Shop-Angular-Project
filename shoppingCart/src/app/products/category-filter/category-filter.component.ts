import { CategoryService } from './../../services/category.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { SubSink } from 'subsink';

@Component({
  selector: 'category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent implements OnInit,OnDestroy {
  //input property 
  @Input('category') category: string | null = "";

  categoryList: any[] = [];
  private subs  = new SubSink();
  constructor( private categortyService: CategoryService) { }
  
  ngOnInit(): void {
    //Get Product list from ProductService

    this.subs.add(
      this.categortyService.getCategory().subscribe(category => {
        if (category) this.categoryList = category;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
