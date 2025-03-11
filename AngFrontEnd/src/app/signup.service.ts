import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
apiUrl = 'http://localhost:1005/auth/register'

  constructor(private _http:HttpClient) { }

  signup(email:any,password:any, confirmpassword:any, full_name:any, phone_number:any){
    console.log("signup done")
    return this._http.post(this.apiUrl, { email, password, confirmpassword, full_name, phone_number });
  }
}