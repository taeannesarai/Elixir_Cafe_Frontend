import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactFormComponent } from './pages/contact-form/contact-form.component';
import { BreakfastMenuComponent } from './pages/breakfast-menu/breakfast-menu.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { BevCoffeeMenuComponent } from './pages/bev-coffee-menu/bev-coffee-menu.component';
import { AddBreakfastComponent } from './pages/breakfast-menu/add-breakfast/add-breakfast.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginSignupComponent } from './pages/login-signup/login-signup.component';
import { UpdateBreakfastComponent } from './pages/breakfast-menu/update-breakfast/update-breakfast.component';
import { ViewBreakfastComponent } from './pages/breakfast-menu/view-breakfast/view-breakfast.component';
import { AuthGuardGuard } from './shared/guards/auth-guard.guard';
import { AdminGuard } from './shared/guards/admin.guard';
import { AddBevCoffeeComponent } from './pages/bev-coffee-menu/add-bev-coffee/add-bev-coffee.component';
import { UpdateBevCoffeeComponent } from './pages/bev-coffee-menu/update-bev-coffee/update-bev-coffee.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { AddOrderComponent } from './pages/orders/add-order/add-order.component';
import { ViewBevCoffeeComponent } from './pages/bev-coffee-menu/view-bev-coffee/view-bev-coffee.component';
import { ViewOrderComponent } from './pages/orders/view-order/view-order.component';
import { UpdateOrderComponent } from './pages/orders/update-order/update-order.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';

const routes: Routes = [
  {
    path: 'index',
    title: 'Home',
    component: HomeComponent,
  },

  {
    path: 'about',
    title: 'About',
    component: AboutComponent,
  },

  {
    path: 'contact',
    title: 'Contact Page',
    component: ContactFormComponent,
  },

  {
    path: 'breakfast',
    title: 'Breakfast Menu',
    component: BreakfastMenuComponent,
  },

  {
    path: 'admin/add-breakfast',
    title: 'create breakfast',
    component: AddBreakfastComponent,
    canActivate: [AuthGuardGuard, AdminGuard],
  },

  {
    path: 'view-breakfast/:bId',
    title: 'view breakfast',
    component: ViewBreakfastComponent,
  },

  {
    path: 'admin/edit-breakfast/:bId',
    title: 'Edit breakfast',
    component: UpdateBreakfastComponent,
  },

  {
    path: 'beverages',
    title: ' Beverage Menu',
    component: BevCoffeeMenuComponent,
  },
  {
    path: 'admin/add-beverages',
    title: 'Add Beverage ',
    component: AddBevCoffeeComponent,
  },

  {
    path: 'admin/edit-beverage/:bcId',
    title: 'Edit Beverage',
    component: UpdateBevCoffeeComponent,
  },

  {
    path: 'view-beverage/:bcId',
    title: 'View Beverage ',
    component: ViewBevCoffeeComponent,
  },

  {
    path: 'orders',
    title: 'all orders',
    component: OrdersComponent,
    canActivate: [AuthGuardGuard],
  },

  {
    path: 'add-orders',
    title: 'Add order',
    component: AddOrderComponent,
  },

  {
    path: 'view-order/:oId',
    title: 'View order',
    component: ViewOrderComponent,
  },

  {
    path: 'view-order-details/:odId',
    title: 'view order details',
    component: OrderDetailsComponent,
  },

  {
    path: 'login-signup',
    title: 'Login - Sign Up',
    component: LoginSignupComponent,
  },

  {
    path: 'cart',
    title: 'cart',
    component: CartComponent,
  },

  { path: '', redirectTo: 'index', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
