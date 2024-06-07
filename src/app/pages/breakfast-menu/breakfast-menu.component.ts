import { Component, OnInit } from '@angular/core';
import { BreakfastMenuService } from 'src/app/services/breakfast-menu.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-breakfast-menu',
  templateUrl: './breakfast-menu.component.html',
  styleUrls: ['./breakfast-menu.component.css']
})
export class BreakfastMenuComponent implements OnInit {
  breakfastItems: any[] = [];
  loginErr: boolean = false;

  user: any;

  constructor(private breakfastMenuService: BreakfastMenuService,
    private router: Router,
     private authService: AuthService
  ) { }

  ngOnInit(): void {
    //  this.addToCart();
    this.getAllBreakfast();

    this.authService.getCurrUser(() => {
      this.user = this.authService.currUser;
   });
      
  }

  getAllBreakfast() {
    this.breakfastMenuService.getAllBreakfast().subscribe({
      next: (res) => {
        this.loginErr = false;
        if (res['status'] == 'error') {
          this.breakfastItems = [];
        } else if (res['status'] == 'success') {
          console.log('breakfastItems: ', res);
          this.breakfastItems = res['data']['breakfast_menu'];
        }
      },
      });
  }

  /**
   * 
   * @param itemId id for selected item
   * @param itemName name of selected item
   * @param itemImg image of selected item
   * @param itemPrice price of selected item
   */
  addToCart(itemId: number, itemName: string, itemImg: string, itemPrice: string) {
    console.log("cartbutton clicked");
    
    let cartArray: any[] = [];
    let cart = localStorage.getItem('cart');
    
    if (!cart) {
      cartArray.push({ id: itemId, item: itemName, image: itemImg, price: itemPrice})
      localStorage.setItem("cart", JSON.stringify(cartArray));
    }
    else {
      cartArray = JSON.parse(cart);
      cartArray.push({ id: itemId, item: itemName, image: itemImg, price: itemPrice })
      localStorage.setItem("cart", JSON.stringify(cartArray));
    }
  }


deleteItem(bId: number, itemName: string) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-1',
        cancelButton: 'btn btn-danger mx-1',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: `Are you sure you want to delete ${itemName.trim()}?`,
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
          this.breakfastMenuService.deleteBreakfast(bId).subscribe((res) => {
            if (res['status'] === 'success') {
              this.getAllBreakfast();
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
