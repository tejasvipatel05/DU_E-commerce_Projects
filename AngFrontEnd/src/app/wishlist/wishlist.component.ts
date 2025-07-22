import { Component } from '@angular/core';
import { WishlistService } from '../wishlist.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  wishlist: any= {};

  constructor(private wishlistService: WishlistService, private router: Router) {}

  ngOnInit() {
    // Fetch the wishlist items when component is initialized
    this.getWishlist();
  }

  // Fetch the wishlist from the service
  getWishlist() {
    this.wishlistService.getWishlist().subscribe((response: any) => {
        this.wishlist = response;  // Assuming response contains items array
        console.log("wishlist:",this.wishlist);
      }
    );
  }

  // Add product to the cart
  addToWishlist(productId: string) {
    this.wishlistService.addtoWishlist(productId).subscribe(
      (response: any) => {
        console.log('Product added to wishlist:', response);
      }
    );
  }

  // Remove product from the wishlist
  removeFromWishlist(productId: string) {
    this.wishlistService.removeFromWishlist(productId).subscribe(
      (response: any) => {
        this.getWishlist();  // Refresh the wishlist after removal
      }
    );
  }

  // Proceed to the checkout page
  proceedToCheckout() {
    if (this.wishlist.length === 0) {
      alert('Your wishlist is empty!');
      return;
    }
    // Redirect to the checkout page
    this.router.navigate(['/checkout']);
  }
}
