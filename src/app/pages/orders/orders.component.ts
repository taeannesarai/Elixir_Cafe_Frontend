import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  loginErr: boolean = false;
  orders: any[] = [];

  user: any;

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllOrders();

    this.authService.getCurrUser(() => {
      this.user = this.authService.currUser;
    });
  }

  getAllOrders() {
    this.ordersService.getALLOrders().subscribe({
      next: (res) => {
        this.loginErr = false;
        if (res['status'] == 'error') {
          this.orders = [];
          } else if (res['status'] == 'success') {
          console.log('orders ', res);
          this.orders = res['data']['order'];
        }
      },
    });
  }

  /**
   * This function calls a sweetalert confirmation menu to delete a selected order
   * @param oId Number - The id for the order to be deleted
   * @param 0 String - The name of the order to be deleted
   */

  selectDelete(oId: number, firstName: string) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-1',
        cancelButton: 'btn btn-danger mx-1',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: `Are you sure you want to delete ${firstName.trim()} course?`,
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
          });

          // Call the delete function if the user confirm delete
          this.ordersService.deleteOrder(oId).subscribe((res) => {
            if (res['status'] === 'success') {
              this.getAllOrders();
            }
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelled',
            text: 'Your imaginary file is safe :)',
            icon: 'error',
          });
        }
      });
  }
}
