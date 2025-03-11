import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiCartService {

  apiUrl = 'http://localhost:1005/cart/me/products'

  private cart: any[] = [];

  constructor(private _http: HttpClient) {}

  // addToCart(product_id: any, seller_id: any, quantity:any) {
  //   return this._http.post(this.apiUrl, {product_id, seller_id, quantity}, {headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)})
  // }

  addToCart(product_id: any, seller_id: any, quantity: any) {
    const token = localStorage.getItem('token');
    console.log("Token Sent to API:", token); // Debugging
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Ensure proper content type
    });
  
    return this._http.post(this.apiUrl, { product_id, seller_id, quantity }, { headers });
  }

  
  getCartItems() {
    return this.cart;
  }
}
