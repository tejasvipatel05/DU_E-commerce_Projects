import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiCartService } from '../api-cart.service';
import { FormsModule } from '@angular/forms';
import { ApiProductService } from '../api-product.service';
import { Product } from '../product';

@Component({
  selector: 'app-best-selling',
  imports: [CommonModule, FormsModule],
  templateUrl: './best-selling.component.html',
  styleUrl: './best-selling.component.css'
})
export class BestSellingComponent {
  bestSellingProducts: any[] = [];
  quantity:number = 1;

  constructor(private productService: ApiProductService, private cartService: ApiCartService) {}

  ngOnInit(): void {
    this.productService.getBestSellingProducts().subscribe(
      (data) => {
        this.bestSellingProducts = data;
      },
      (error) => {
        console.error("Error fetching best-selling products:", error);
      }
    );
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
