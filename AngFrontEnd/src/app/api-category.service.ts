import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiCategoryService {

  constructor(private _http: HttpClient) { }
  apiUrl = "http://localhost:1005/category"
  getAllCategory(){
    return this._http.get(this.apiUrl);
  };
}
