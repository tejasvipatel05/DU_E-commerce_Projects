import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiProductService } from '../api-product.service';
import { CommonModule } from '@angular/common';
import { ApiCartService } from '../api-cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productdetailed',
  imports: [CommonModule],
  templateUrl: './productdetailed.component.html',
  styleUrl: './productdetailed.component.css'
})
export class ProductdetailedComponent {
  product:any ={};
  quantity:number = 1;

  constructor(private route: ActivatedRoute, private _api: ApiProductService, private _router: Router, private cartService: ApiCartService) {}

  ngOnInit() {
    const productId = this.route.snapshot.params['id'];
    if (productId) {
      this._api.getProductById(productId).subscribe((data) => {        
        this.product = data;
      }, (error) => {
        console.error('Error fetching product details', error);
      });
    }
  }

  addToCart(id: any, seller_id: any) {
      console.log(seller_id)
      this.cartService.addToCart(id, seller_id, this.quantity).subscribe(res => {
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

  goBack() {
    this._router.navigate(['/products']);
  }
}
