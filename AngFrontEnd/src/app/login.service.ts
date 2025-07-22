import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl = 'http://localhost:1005/auth/login'

  constructor(private _http:HttpClient) { }

  login(email:any,password:any){
    console.log("login post", email, password)
    return this._http.post(this.apiUrl, {email, password});
  }
}
