import { Component } from '@angular/core';
import { ApiProductService } from '../api-product.service';
import Swiper from 'swiper';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ApiCartService } from '../api-cart.service';

@Component({
  selector: 'app-featured-product',
  imports: [CommonModule],
  templateUrl: './featured-product.component.html',
  styleUrl: './featured-product.component.css'
})
export class FeaturedProductComponent {
  products: any = []; // No interface, just raw data
  quantity:number = 1;

  constructor(private productService: ApiProductService, private cartService:ApiCartService) {}

  ngOnInit(): void {
    this.productService.getFeaturedProducts().subscribe(
      (data) => {
        this.products = data;
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
