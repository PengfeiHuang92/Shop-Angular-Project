import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from './../../services/category.service';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent{

  //list of categoryList
  categoryList$:any;

  //create a empty product object
  product = new Product('','','','');
  productId = "";

  //button label
  buttonLabel = "Submit";

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

  //Properties
  get itemTitle(){
    return this.form.get('title');
  }
  get itemPrice(){
    return this.form.get('price');
  }
  get itemCategory(){
    return this.form.get('category');
  }
  get itemImgUrl(){
    return this.form.get('imgUrl');
  }

  
  constructor(
    private categoryService : CategoryService,
    private productService : ProductService,
    private router: Router,
    private route: ActivatedRoute) { 

    this.categoryList$ = categoryService.getCategory();
   
    let id = this.route.snapshot.paramMap.get('id');
    if(id){
      //Showing Update button label instead 
      this.buttonLabel = "Update";
      
      //getting product object from firebase
      this.productService.getProduct(id).valueChanges()
      .pipe(take(1))
      .subscribe(
        product => {
          if(product) return this.product = product;
          return null;
        }
      );

      //Saving the product id for update
      this.productId = id;
    } 

  }
  

  //Postcondistion: If the form is valid and product has a product id then do update.
  //                If the form is valid and does not has a product if then do create.
  submit(){
    if(this.form.valid){
      if(this.productId){
        this.productService.updateProduct(this.productId,this.product);
      }else{
        this.productService.create((this.form.value));
      }
    }
    this.form.reset();
    this.router.navigate(['/admin/admin-products']);
  }

  delete(){
    if(confirm("Are you sure that you would like to delete this item?")){
      this.productService.deleteProduct(this.productId)
      .then( () =>{
        this.form.reset();
        this.router.navigate(['/admin/admin-products']); 
      }
      );
    }
    return;
  }

}
