import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { OrderService } from '../order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details',
  imports: [CommonModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {
  orderDetails: any;
  loading: boolean = true;
  error: string | null = null;
  orderID: string = '';  // This will be dynamically populated from route params

  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Get the orderID from route params
    this.orderID = this.activatedRoute.snapshot.paramMap.get('orderID') || '';

    // Fetch order details based on orderID
    if (this.orderID) {
      this.fetchOrderDetails();
    } else {
      this.error = 'Invalid order ID';
      this.loading = false;
    }
  }

  // Function to fetch order details using the orderID
  fetchOrderDetails(): void {
    this.orderService.getOrderDetails(this.orderID).subscribe(
      (response: any) => {
        if (response && response.order) {
          this.orderDetails = response.order;  // Assuming the response contains 'order'
        } else {
          this.error = 'Order not found';
        }
        this.loading = false;  // Stop loading once the data is fetched
      },
      (error) => {
        this.error = 'Failed to fetch order details';
        console.error('Error fetching order details:', error);
        this.loading = false;  // Stop loading in case of error
      }
    );
  }

  // Function to calculate the total price of the order
  calculateTotalAmount(order: any): number {
    if (!order || !order.items) {
      return 0;
    }
    return order.items.reduce((total: number, item: any) => {
      return total + item.quantity * item.price;  // Calculate total price
    }, 0);
  }

  goBack(){
    this.router.navigate(['/myorders'])
  }
}
