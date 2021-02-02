import { Router } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Category } from './../../models/category';
import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from './../../services/category.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent{

  categoryList$;

  //Validators
  form = new FormGroup({
    title: new FormControl('',[
      Validators.required
    ]),
    price: new FormControl('',[
      Validators.required,
      Validators.min(0)
    ]),
    category: new FormControl('',[
      Validators.required
    ]),
    imgUrl: new FormControl('',[
      Validators.required,
      Validators.pattern('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$') // fragment locator
    ])
  });

  constructor(
    private categoryService : CategoryService,
    private productService : ProductService,
    private router: Router) { 
    //snapshotChanges reutrn the keys
    //  categoryService.getCategory().snapshotChanges()
    // .subscribe(x =>console.log(x));
    
    this.categoryList$ = categoryService.getCategory().valueChanges();
   
  }

  //Properties
  get title(){
    return this.form.get('title');
  }
  get price(){
    return this.form.get('price');
  }
  get category(){
    return this.form.get('category');
  }
  get imgUrl(){
    return this.form.get('imgUrl');
  }

  submit(){
    if(this.form.valid){
      this.productService.create((this.form.value));
    }
    this.form.reset();
    this.router.navigate(['/admin/admin-products']);
  }

}
