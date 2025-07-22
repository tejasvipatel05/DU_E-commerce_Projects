import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ApiProductService {

  private apiUrl = 'http://localhost:1005/product'; // Your backend API
  constructor(private _http: HttpClient) {}

  getBestSellingProducts(): Observable<any> {
    return this._http.get(`${this.apiUrl}/best-sellers`);
  }

  getFeaturedProducts(): Observable<Product[]> {
    return this._http.get<any[]>(`${this.apiUrl}/featured`);
  }

  getPopularProducts(): Observable<any[]> {
    return this._http.get<any[]>(`${this.apiUrl}/popular`);
  }

  getJustArrivedProducts(): Observable<any> {
    return this._http.get<any>(`${this.apiUrl}/new-arrivals`);
  }

  getAllProducts() {
    return this._http.get(this.apiUrl);
  }

  getProductById(id: string) {
    return this._http.get(this.apiUrl+'/'+id);
  }

  getProductByCat(id: string){
    return this._http.get(this.apiUrl+'/category/'+id)
  }
  
}
