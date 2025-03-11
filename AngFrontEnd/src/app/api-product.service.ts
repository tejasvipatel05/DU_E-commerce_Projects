import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiProductService {

  private apiUrl = 'http://localhost:1005/product'; // Your backend API

  constructor(private _http: HttpClient) {}

  getAllProducts() {
    return this._http.get(this.apiUrl);
  }

  getProductById(id: string) {
    return this._http.get(this.apiUrl+'/'+id);
  }
  
}
