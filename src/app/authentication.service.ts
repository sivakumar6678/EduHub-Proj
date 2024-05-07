import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isLoggedInStatus: boolean = false;
  private token: string | null = null;

  constructor() { }
  setToken(token: string): void {
    this.token = token;
  }
  getToken(): string | null {
    return this.token;
  }
  setLoginStatus(status: boolean): void {
    this.isLoggedInStatus = status;
  }

  isLoggedIn(): boolean {
    return this.isLoggedInStatus;
  }
}
