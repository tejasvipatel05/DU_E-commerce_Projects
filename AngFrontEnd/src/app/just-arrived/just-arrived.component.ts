import { Component } from '@angular/core';
import { ApiProductService } from '../api-product.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ApiCartService } from '../api-cart.service';

@Component({
  selector: 'app-just-arrived',
  imports: [RouterLink, CommonModule],
  templateUrl: './just-arrived.component.html',
  styleUrl: './just-arrived.component.css'
})
export class JustArrivedComponent {
  justArrivedProducts: any[] = [];
  quantity: number = 1;

  constructor(private productService: ApiProductService, private cartService : ApiCartService) {}

  ngOnInit(): void {
    this.productService.getJustArrivedProducts().subscribe(response => {
      this.justArrivedProducts = response; // Assuming response is an array of products
    }
  )
  }

  addToCart(id: any, seller_id: any) {
    this.cartService.addToCart(id, seller_id, this.quantity).subscribe((res: any) => {
      Swal.fire({
        title: 'Product Added to Cart!',
        text: 'Your item has been added successfully.',
        icon: 'success',
        toast: true,  // Makes it a toast (non-blocking popup)
        position: 'top-end',  // Positions it in the top-right corner
        showConfirmButton: false,  // Hides the confirm button
        timer: 2000,  // Auto-closes after 2 seconds
        timerProgressBar: false,  // Shows a progress bar
        background: '#f9f9f9',  // Light background
        color: '#333',  // Text color
        iconColor: '#4CAF50',  // Green icon color
        showClass: {
          popup: 'animate__animated animate__fadeInRight'  // Animation for showing
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutRight'  // Animation for hiding
        }
      });
    })
  }
}
