import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private apiUrl = 'http://localhost:1005/wishlist';  // Replace with your API endpoint
  private token = localStorage.getItem('token');  // Get token from local storage or session storage
 
  constructor(private _http: HttpClient) {}

  // Get wishlist from the backend API
  getWishlist(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    return this._http.get<any>(`${this.apiUrl}/me`, { headers });  // Adjust the endpoint as needed
  }

  addtoWishlist(productId: any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    // console.log(`${this.apiUrl}/me/products/${productId}`);
    
    return this._http.post(`${this.apiUrl}/me/products/${productId}`,{ productId }, { headers })
  }


  // Add product to cart
  // addToCart(productId: string){
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${this.token}`,
  //     'Content-Type': 'application/json',
  //   });
  //   return this.http.post<any>(`${this.apiUrl}/add-to-cart`, { productId }, { headers });
  // }

  // Remove product from wishlist
  removeFromWishlist(productId: string){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    return this._http.delete<any>(`${this.apiUrl}/me/products/${productId}`, { headers });
  }
  
}
