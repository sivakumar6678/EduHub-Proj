import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginSignupButtonsComponent } from '../login-signup-buttons/login-signup-buttons.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [LoginSignupButtonsComponent,ReactiveFormsModule,CommonModule]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  resetPasswordForm!: FormGroup;
  isLoginFormChanged: boolean = false;
  isResetPasswordFormChanged: boolean = false;
  passwordVisible: boolean = false;
  resetPasswordVisible: boolean = false;
  loginvisible: boolean = true;
  errorMessage: string = '';
  successMessage: string = '';
password: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeLoginForm();
    this.initializeResetPasswordForm();
    this.subscribeToFormChanges();
  }

  initializeLoginForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  initializeResetPasswordForm(): void {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  subscribeToFormChanges(): void {
    this.loginForm.valueChanges.subscribe(() => {
      this.isLoginFormChanged = true;
    });

    this.resetPasswordForm.valueChanges.subscribe(() => {
      this.isResetPasswordFormChanged = true;
    });
  }

  loginUser(): void {
    if (this.loginForm.valid) {
      const credentials = {
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value
      };

      this.http.post<any>('http://localhost:4200/api/login', credentials).subscribe({
        next: (response) => {
          console.log("RESPONSE DATA " + JSON.stringify(response))
          if (response.responseCode === '200') {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("username", credentials.username);
            this.router.navigate(["/dashboard"]);
          }
          window.alert(response.responseMsg);
        },
        error: (error) => {
          console.log("An Error Occurred " + error);
          this.errorMessage = 'Invalid username or password.';
        }
      });
    } else {
      this.errorMessage = 'Please fill out all required fields.';
    }
  }

  resetPassword(): void {
    if (this.resetPasswordForm.valid) {
      const formData = this.resetPasswordForm.value;
      this.http.post<any>('http://localhost:4200/api/reset-password', formData).subscribe({
        next: (response) => {
          this.successMessage = 'Password reset successful. Check your email for further instructions.';
          this.resetPasswordForm.reset();
        },
        error: (error) => {
          this.errorMessage = 'Password reset failed. Please try again later.';
        }
      });
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  toggleResetPasswordForm(event: Event): void {
    event.preventDefault();
    this.resetPasswordForm.reset();
    this.isResetPasswordFormChanged = false;
  }

  toggleLogin() {
    this.router.navigate(['/registration-form']);
  }
}
