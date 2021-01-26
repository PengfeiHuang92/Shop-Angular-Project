import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

//Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//Routering
import { RouterModule } from '@angular/router';

//Bootstrap
import { NgModule } from '@angular/core';

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
    AdminProductsComponent
  ],
  imports: [
    BrowserModule,
    
    //Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    //BootStrap
    NgbModule,

    //Router
    RouterModule.forRoot([
      { path:'', component: HomeComponent },
      { path:'products', component: ProductsComponent },
      { path:'shopping-cart', component: ShoppingCartComponent },
      //using canActivate to protect none sigin user access check-out pager
      { path:'check-out', component: CheckOutComponent, canActivate:[AuthGuardService]},
      { path:'order-success', component: OrderSuccessComponent },
      { path:'login', component: LoginComponent },
      { path:'my-order', component: MyOrdersComponent },
      //using canActivate to protect none sigin user access admin products pager
      { path:'admin/admin-products', component: AdminProductsComponent, 
      canActivate:[AuthGuardService,AdminAuthGuardService]
      },
      //using canActivate to protect none sigin user access admin orders pager
      { path:'admin/admin-orders', component: AdminOrdersComponent,
       canActivate:[AuthGuardService,AdminAuthGuardService]
      },
    ])
  ],
  providers: [AuthenticationService,AuthGuardService,UserService,AdminAuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
