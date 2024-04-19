import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = 'http://localhost:4200/api'; // Replace with your API base URL

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any> {
    const url = `${this.apiUrl}/register`; // Adjust the endpoint according to your API
    return this.http.post(url, userData);
  }
}
