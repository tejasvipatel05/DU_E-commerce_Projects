import { Component } from '@angular/core';
import { ApiCartService } from '../api-cart.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart: any = {};
  loading = true;
  error: string | null = null;

  constructor(private cartService: ApiCartService, private router: Router) {}

    ngOnInit(){
      this.getCart();
    }
  
    // Fetch the cart data
    getCart(){
      this.cartService.getCart().subscribe((res) => {
        this.cart = res;  
        // console.log("Processed Cart Data:", this.cart);
      }
    )
    }
  
    // Add product to cart
    addProduct(productId: string, sellerId: string, quantity: number){
      this.cartService.addToCart(productId, sellerId, quantity).subscribe(
        (response) => {
          this.getCart(); // Refresh cart
        },
        (error) => {
          console.error(error);
        }
      );
    }
  
    // Remove product from cart
    async removeProduct(productId: string) {
      (await this.cartService.removeProductFromCart(productId)).subscribe(
        (response) => {
          this.getCart(); // Refresh cart
        },
        (error) => {
          console.error(error);
        }
      );
    }

    // Increase product quantity
  async increaseQuantity(productId: string, currentQuantity: number) {
    const newQuantity = currentQuantity + 1;
    await this.updateProductQuantity(productId, newQuantity);
  }

  // Decrease product quantity
  async decreaseQuantity(productId: string, currentQuantity: number) {
    // Ensure quantity doesn't go below 1 (if you want to prevent negative quantities)
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      await this.updateProductQuantity(productId, newQuantity);
    } else{
      await this.removeProduct(productId);
    }
  }

  // Update product quantity in the cart
  private async updateProductQuantity(productId: string, quantity: number) {
    try {
      this.updateQuantity(productId,quantity);
      // this.cart = this.cartService.updateProductInCart(productId, quantity);
    } catch (error) {
      console.error("Error updating product quantity:", error);
    }
  }
  
    // Update product quantity
    updateQuantity(productId: string, quantity: number){
      this.cartService.updateProductInCart(productId, quantity).subscribe(() => {
          this.getCart(); // Refresh cart
        }
      );
    }
  
    // Clear cart
    async clearCart(){
      (await this.cartService.clearCart()).subscribe(
        (response) => {
          this.cart = null; // Clear the cart view
        },
        (error) => {
          console.error(error);
        }
      );
    }
  
    // Apply coupon
    async applyCoupon(couponCode: string) {
      (await this.cartService.applyCouponToCart(couponCode)).subscribe(
        (response) => {
          this.getCart(); // Refresh cart
        },
        (error) => {
          console.error(error);
        }
      );
    }
  
    // Remove coupon
    async removeCoupon() {
      (await this.cartService.removeCouponFromCart()).subscribe(
        (response) => {
          this.getCart(); // Refresh cart
        },
        (error) => {
          console.error(error);
        }
      );
    }
    proceedToCheckout() {
      if (this.cart.length === 0) {
        alert('Your cart is empty!');
        return;
      }
      // Redirect to checkout page (or trigger checkout process)
      this.router.navigate(['/checkout']);
    }

    getTotalAmount(): number {
      return this.cart.products.reduce((total: number, item: { product_id: { price: number; }; quantity: number; }) => total + item.product_id.price * item.quantity, 0);
    }
  }

  // increaseQuantity(productId: string) {
  //   const item = this.cart.products.find((i: { product_id: { _id: string; }; }) => i.product_id._id === productId);
  //   if (item) {
  //     item.quantity++;
  //   }
  //   this.cartService.updateCart(product_id, ).subscribe((res)=>{
  //     this.cart=res;
  //   })
  // }

  // decreaseQuantity(productId: string) {
  //   const item = this.cart.products.find((i: { product_id: { _id: string; }; }) => i.product_id._id === productId);
  //   if (item && item.quantity > 1) {
  //     item.quantity--;
  //   }

  // }

  // removeItem(productId: string) {
  //   const index = this.cart.findIndex((i: { product_id: { _id: string; }; }) => i.product_id._id === productId);
  //   if (index !== -1) {
  //     this.cart.splice(index, 1); // Removes the item from the array
  //   }
  // }

  
