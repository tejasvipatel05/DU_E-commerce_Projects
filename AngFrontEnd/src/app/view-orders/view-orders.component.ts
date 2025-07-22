import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-view-orders',
  imports: [CommonModule],
  templateUrl: './view-orders.component.html',
  styleUrl: './view-orders.component.css'
})
export class ViewOrdersComponent {
    orders: any[] = [];
  
    constructor(private orderService: OrderService, private router: Router) {}
  
    ngOnInit() {
      // Fetch the order history when the component is initialized
      this.fetchOrderHistory();
    }
  
    fetchOrderHistory() {
      // Replace this with your actual service call to get the order data
      this.orderService.getOrderHistory().subscribe((response: any) => {
        console.log(response);
        
          this.orders = response; // Assuming response contains orders array
        }
      );
    }
  
    viewOrderDetails(orderID: string) {
      // Navigate to the order details page, passing the order number
      this.router.navigate(['/order-details', orderID]);
    }
  }