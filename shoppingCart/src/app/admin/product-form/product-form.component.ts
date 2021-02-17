import { SubSink } from 'subsink';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from './../../services/category.service';
import { take } from 'rxjs/operators';



@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {

  //list of categoryList
  categoryList: any;

  //create a empty product object
  product: any;
  productId = "";

  //button label
  buttonLabel = "Submit";

  //SubSink
  sub = new SubSink();
  //product card info
  pTitle: string = "";
  pPrice: any;
  pCategory: any;
  pImgUrl: any;

  //Validators
  form = new FormGroup({
    title: new FormControl('', [
      Validators.required
    ]),
    price: new FormControl('', [
      Validators.required,
      Validators.min(0)
    ]),
    category: new FormControl('', [
      Validators.required
    ]),
    imgUrl: new FormControl('', [
      Validators.required,
      Validators.pattern('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$') // fragment locator
    ])
  });
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {

  }
 
  //Properties
  get itemTitle() {
    return this.form.get('title');
  }
  get itemPrice() {
    return this.form.get('price');
  }
  get itemCategory() {
    return this.form.get('category');
  }
  get itemImgUrl() {
    return this.form.get('imgUrl');
  }


  ngOnInit() {
    this.sub.add(
      this.form.controls['title'].valueChanges.subscribe(x => this.pTitle = x),
      this.form.controls['price'].valueChanges.subscribe(x => this.pPrice = x),
      this.form.controls['category'].valueChanges.subscribe(x => this.pCategory = x),
      this.form.controls['imgUrl'].valueChanges.subscribe(x => this.pImgUrl = x),

    );

    //list of Category
    this.categoryService.getCategory().subscribe(category => {
      this.categoryList = category;
    });

    //id that pass in from admin-product
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      //Showing Update button label instead 
      this.buttonLabel = "Update";

      //getting product object from firebase
      this.productService.getProduct(id).valueChanges()
        .pipe(take(1))
        .subscribe(
          product => {
            if (product) {
              this.form.controls['title'].setValue(product.title);
              this.form.controls['category'].setValue(product.category);
              this.form.controls['price'].setValue(product.price);
              this.form.controls['imgUrl'].setValue(product.imgUrl);
            };
            return null;
          }
        );

      //Saving the product id for update
      this.productId = id;
    }
  }


  //Postcondistion: If the form is valid and product has a product id then do update.
  //                If the form is valid and does not has a product if then do create.
  submit() {
    if (this.form.valid) {
      if (this.productId) {
        this.productService.updateProduct(this.productId, this.form.value);
      } else {
        this.productService.create((this.form.value));
      }
    }
    this.form.reset();
    this.router.navigate(['/admin/admin-products']);
  }
  //Postcondistion: Pop up cocnfirm information.
  //                When "Yes" is chosen, the selected prodcut is deleted by calling deleteProduct method.
  //                Wehn "No" is chosen, return.
  delete() {
    if (confirm("Are you sure that you would like to delete this item?")) {
      this.productService.deleteProduct(this.productId)
        .then(() => {
          this.form.reset();
          this.router.navigate(['/admin/admin-products']);
        }
        );
    }
    return;
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}