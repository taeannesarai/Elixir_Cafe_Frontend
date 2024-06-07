import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any;
  cartItems: any;


  ngOnInit(): void {
    this.getCart()
  }


  getCart(): void {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    // console.log("cart: ", this.cart);
    this.cartItems = this.cart; // Assign cartItems to the cart
  }

  removeFromCart(item: any): void {
    const index = this.cartItems.findIndex((cartItem: any) => cartItem.id === item.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1); // Remove the item from cartItems array
      this.cart = this.cartItems; // Update the cart with the modified cartItems
      localStorage.setItem('cart', JSON.stringify(this.cart)); // Update localStorage
    }
  }
  
}
