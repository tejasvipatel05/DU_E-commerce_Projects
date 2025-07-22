import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private apiUrl = 'http://localhost:1005/user';
  token = localStorage.getItem('token')

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<any> {
    const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        });
    return this.http.get(`${this.apiUrl}/profile`, {headers});
  }

  updateUserProfile(profileData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, profileData);
  }

  uploadProfilePicture(fileData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload-profile-picture`, fileData);
  }
}
