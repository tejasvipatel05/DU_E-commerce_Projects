import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCartService {

  apiUrl = 'http://localhost:1005/cart/me'

  token = localStorage.getItem('token');
  private cart: any[] = [];
  quantity: any;
  constructor(private _http: HttpClient) {}

  // Get Cart
  getCart() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    // Return the observable directly, subscription will be handled in the component
    return this._http.get(`${this.apiUrl}`, { headers });
  }

  // Add product to cart
  addToCart(product_id: any, seller_id: any, quantity: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    // Return observable directly
    return this._http.post(`${this.apiUrl}/products`, { product_id, seller_id, quantity }, { headers });
  }

  // Update product quantity in cart
  updateProductInCart(productId: string, quantity: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    // Return observable directly
    // console.log("ProductId:",`${this.apiUrl}/products/${productId}`);
    // console.log("Quantity:",quantity);
    return this._http.put(`${this.apiUrl}/products/${productId}`, { quantity }, { headers });
  }

  // Remove product from cart
  removeProductFromCart(productId: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    // Return observable directly
    return this._http.delete(`${this.apiUrl}/products/${productId}`, { headers });
  }

  // Clear the user's cart
  clearCart() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    // Return observable directly
    return this._http.delete(`${this.apiUrl}`, { headers });
  }

  // Apply coupon to cart
  applyCouponToCart(couponCode: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    // Return observable directly
    return this._http.post(`${this.apiUrl}/coupon`, { couponCode }, { headers });
  }

  // Remove coupon from cart
  removeCouponFromCart() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    // Return observable directly
    return this._http.delete(`${this.apiUrl}/coupon`, { headers });
  }
}
