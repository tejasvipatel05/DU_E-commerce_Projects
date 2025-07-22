import { Component } from '@angular/core';
import { ApiCartService } from '../api-cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order',
  imports: [FormsModule, CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  cart: any = {}; // Holds the cart data
  shippingDetails = { address: '', city: '', postalCode: '' };
  paymentMethod: string = ''; // Holds the selected payment method

  constructor(private cartService: ApiCartService, private orderService: OrderService) {}

  ngOnInit() {
    // Get the cart data when the component loads
    this.cartService.getCart().subscribe((res: any) => {
      this.cart = res;
      console.log('Cart:', this.cart);
    });
  }

  getTotalAmount() {
    return this.cart.products.reduce((total: number, item: any) => total + item.product_id.price * item.quantity, 0);
  }

  submitShippingDetails() {
    // Submit the shipping details to the server
    console.log('Shipping details:', this.shippingDetails);
  }

  submitPaymentMethod() {
    // Submit the selected payment method to the server
    console.log('Selected Payment Method:', this.paymentMethod);
    this.orderService.saveShippingDetails(this.shippingDetails, this.cart, this.getTotalAmount()).subscribe((res)=>{
      console.log("shipping response:",res);
    })
  }
}
