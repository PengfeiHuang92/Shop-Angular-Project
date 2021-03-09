

import { NgModule } from '@angular/core';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

//Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';


//Routering
import { RouterModule } from '@angular/router';


//Component
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { HomeComponent } from './home/home.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { LoginComponent } from './login/login.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';

//service
import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { ShoppingCartService } from './services/shopping-cart.service';

//Data Table:  
import { DataTablesModule } from 'angular-datatables';
import { CategoryFilterComponent } from './products/category-filter/category-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { ViewOrderComponent } from './my-orders/view-order/view-order.component';
import { ShoppingCartItemsComponent } from './shopping-cart-items/shopping-cart-items.component';
import { AdminOrderItemComponent } from './admin/admin-orders/admin-order-item/admin-order-item.component';



@NgModule({
  declarations: [
    AppComponent,
    MyOrdersComponent,
    HomeComponent,
    BsNavbarComponent,
    CheckOutComponent,
    LoginComponent,
    OrderSuccessComponent,
    ProductsComponent,
    ShoppingCartComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    ProductFormComponent,
    CategoryFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ViewOrderComponent,
    ShoppingCartItemsComponent,
    AdminOrderItemComponent
  ],
  imports: [
    BrowserModule,
    
    //Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    //BootStrap
    NgbModule,

    //ngform 
    FormsModule,
    ReactiveFormsModule,
    
    //Data Table
    DataTablesModule,

    //Router
    RouterModule.forRoot([
      { path:'', component: HomeComponent },
      { path:'products', component: ProductsComponent },
      { path:'shopping-cart', component: ShoppingCartComponent },
      //using canActivate to protect none sigin user access check-out pager
      { path:'check-out', component: CheckOutComponent, canActivate:[AuthGuardService]},
      { path:'order-success/:id', component: OrderSuccessComponent },
      { path:'login', component: LoginComponent },
      { path:'my-order', component: MyOrdersComponent },
      { path:'my-order/view-order/:id', component: ViewOrderComponent},
    
      { 
        path:'admin/products/new', component: ProductFormComponent, 
        canActivate:[AuthGuardService,AdminAuthGuardService]
      },
      { 
        path:'admin/products/eidt/:id', component: ProductFormComponent, 
        canActivate:[AuthGuardService,AdminAuthGuardService]
      },
      { 
        path:'admin/admin-products', component: AdminProductsComponent, 
        canActivate:[AuthGuardService,AdminAuthGuardService]
      },
      { 
        path:'admin/admin-orders', component: AdminOrdersComponent,
        canActivate:[AuthGuardService,AdminAuthGuardService]
      },
    ])
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    AdminAuthGuardService,
    UserService,
    ProductService,
    CategoryService,
    ShoppingCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
