import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiProductService } from '../api-product.service';
import { ApiCartService } from '../api-cart.service';
import { WishlistService } from '../wishlist.service';
import { Product } from '../product';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';

@Component({
  selector: 'app-most-popular',
  imports: [CommonModule],
  templateUrl: './most-popular.component.html',
  styleUrl: './most-popular.component.css'
})
export class MostPopularComponent {
  products: any[] = [];
  quantity:number=1;

  constructor(private productService: ApiProductService, private cartService: ApiCartService) {}

  ngOnInit() {
    this.fetchPopularProducts();
  }

  fetchPopularProducts() {
    this.productService.getPopularProducts().subscribe(
      (data) => {
        console.log("data:",data);
        
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
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
