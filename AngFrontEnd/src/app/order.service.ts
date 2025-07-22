import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
apiUrl = 'http://localhost:1005/order'
token = localStorage.getItem('token');

  constructor(private _http:HttpClient) { }

  saveShippingDetails(shippingDetails:any, cart:any, getTotalAmount:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    console.log("shipping details saved")
    return this._http.post(this.apiUrl, { shippingDetails, cart, getTotalAmount }, {headers});
  }

  getOrderHistory() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    // Make a GET request to fetch the user's order history
    return this._http.get(`${this.apiUrl}/me`, {headers});
  }

  getOrderDetails(orderID: string){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    return this._http.get(`${this.apiUrl}/details/${orderID}`, {headers});  // Adjust endpoint as per your backend
  }
}
