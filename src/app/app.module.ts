import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; 

import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BreakfastMenuComponent } from './pages/breakfast-menu/breakfast-menu.component';
import { LoginSignupComponent } from './pages/login-signup/login-signup.component';
import { BevCoffeeMenuComponent } from './pages/bev-coffee-menu/bev-coffee-menu.component';
import { FooterComponent } from './pages/partials/footer/footer.component';
import { HeaderComponent } from './pages/partials/header/header.component';
import { ContactFormComponent } from './pages/contact-form/contact-form.component';
import { ImagesComponent } from './assets/images/images.component';
import { AboutComponent } from './pages/about/about.component';
import { AddBreakfastComponent } from './pages/breakfast-menu/add-breakfast/add-breakfast.component';
import { UpdateBreakfastComponent } from './pages/breakfast-menu/update-breakfast/update-breakfast.component';
import { ViewBreakfastComponent } from './pages/breakfast-menu/view-breakfast/view-breakfast.component';
import { AddBevCoffeeComponent } from './pages/bev-coffee-menu/add-bev-coffee/add-bev-coffee.component';
import { UpdateBevCoffeeComponent } from './pages/bev-coffee-menu/update-bev-coffee/update-bev-coffee.component';
import { ViewBevCoffeeComponent } from './pages/bev-coffee-menu/view-bev-coffee/view-bev-coffee.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { AddOrderComponent } from './pages/orders/add-order/add-order.component';
import { UpdateOrderComponent } from './pages/orders/update-order/update-order.component';
import { ViewOrderComponent } from './pages/orders/view-order/view-order.component';
import { CartComponent } from './pages/cart/cart.component';
import { AuthErrorComponent } from './pages/auth-error/auth-error.component';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BreakfastMenuComponent,
    LoginSignupComponent,
    BevCoffeeMenuComponent,
    FooterComponent,
    HeaderComponent,
    ContactFormComponent,
    ImagesComponent,
    AboutComponent,
    AddBreakfastComponent,
    UpdateBreakfastComponent,
    ViewBreakfastComponent,
    AddBevCoffeeComponent,
    UpdateBevCoffeeComponent,
    ViewBevCoffeeComponent,
    OrdersComponent,
    AddOrderComponent,
    UpdateOrderComponent,
    ViewOrderComponent,
    CartComponent,
    AuthErrorComponent,
    OrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
