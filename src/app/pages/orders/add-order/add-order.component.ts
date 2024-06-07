import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrdersService } from 'src/app/services/orders.service';
import { BreakfastMenuComponent } from '../../breakfast-menu/breakfast-menu.component';
import { BreakfastMenuService } from 'src/app/services/breakfast-menu.service';
import { BevCoffeeMenuComponent } from '../../bev-coffee-menu/bev-coffee-menu.component';
import { BevCoffeeMenuService } from 'src/app/services/bev-coffee-menu.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
})
export class AddOrderComponent implements OnInit {
  breakfasts: any;
  beverages: any;
 

  constructor(
    private ordersService: OrdersService,
    private breakfastService: BreakfastMenuService,
    private beverageService: BevCoffeeMenuService,
    private authServicce: AuthService
  ) {}
  user: any;
  ngOnInit(): void {
    this.getBreakfast();
    this.getBeverages();

    this.authServicce.getCurrUser(() => {
      this.user = this.authServicce.currUser;
    });
  }

  getBreakfast() {
    this.breakfastService.getAllBreakfast().subscribe({
      next: (res) => {
        console.log('Response: ', res);

        this.breakfasts = res.data.breakfast_menu;
      },
    });
  }

  getBeverages() {
    this.beverageService.getAllBeverages().subscribe({
      next: (res) => {
        console.log('Response beverages: ', res);

        this.beverages = res.data.beverages_menu;
      },
    });
  }
  createOrder(order: NgForm) {
    console.log('new order: ', order.value);
    order.value.u_id = this.user?.id;
    this.ordersService.createOrder(order.value).subscribe({
      next: (res) => {
        console.log('new Order: ', res);
      },
      error: (error) => {
        console.log(' new breakfast error: ', error.error);
      },
      complete: () => {},
    });
  }
}
