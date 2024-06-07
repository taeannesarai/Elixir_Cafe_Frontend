import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrdersService } from 'src/app/services/orders.service';
import { BevCoffeeMenuService } from 'src/app/services/bev-coffee-menu.service';
import { BreakfastMenuService } from 'src/app/services/breakfast-menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css'],
})
export class UpdateOrderComponent implements OnInit {
  oId: any; //id for selected orders - from url
  order: any; //used to store order data to be edited
  breakfasts: any;
  beverages: any;

  constructor(
    private ordersService: OrdersService,
    private beverageService: BevCoffeeMenuService,
    private breakfastService: BreakfastMenuService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.oId = params['oId'];
      this.getBreakfast();
      this.getBeverages();

      this.getOrderData();
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

  //Get Breakfast item data
  getOrderData() {
    this.ordersService.getSingleOrder(this.oId).subscribe((res) => {
      if (res['status'] == 'error') {
      } else {
        this.order = res['data'];
      }
      console.log(res);
      
    });
  }

  updateOrder(data: NgForm) {
    this.ordersService.updateOrder(data.value, this.oId).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        console.log(error.error);
        Swal.fire({
          icon: 'error',
          title: 'opps...',
          text: 'Failed to apply changes to order!',
        });
      },
      complete: () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Changes applied to order successfully.',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.router.navigateByUrl('/orders/' + this.oId);
        });
      },
    });
  }
}
