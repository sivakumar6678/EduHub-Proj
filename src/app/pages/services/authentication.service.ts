import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://example.com/api'; // Replace with your API base URL

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    const url = `${this.apiUrl}/login`; // Adjust the login endpoint according to your API
    return this.http.post(url, credentials);
  }

  resetPassword(formData: any): Observable<any> {
    const url = `${this.apiUrl}/reset-password`; // Adjust the reset password endpoint according to your API
    return this.http.post(url, formData);
  }
}
