import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isLoggedInStatus: boolean = false;

  constructor() { }

  setLoginStatus(status: boolean): void {
    this.isLoggedInStatus = status;
  }

  isLoggedIn(): boolean {
    return this.isLoggedInStatus;
  }
}
