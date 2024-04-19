// Added url for backend 
// getting error due to didnt include backend

import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
import { LoginSignupButtonsComponent } from "../login-signup-buttons/login-signup-buttons.component";
import { Router } from '@angular/router';
import { HomeComponent } from "../home/home.component";
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LoginSignupButtonsComponent,
        HomeComponent
    ]
})
export class LoginComponent implements OnInit {
  login!: FormGroup;
  resetPassword!: FormGroup;
  isFormChanged: boolean = false;
  passwordVisible: boolean = false;
  loginvisible: boolean = true;
  resetPasswordVisible: boolean = false;
  authService: any;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.initializeForm();
    this.subscribeToFormChanges();
  }

  initializeForm(): void {
    this.login = this.fb.group({
      loginMethod: ['username', Validators.required],
      username: '',
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
    this.resetPassword = this.fb.group({
      resetEmail: ['', [Validators.required, Validators.email]],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

  }

  passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (newPassword !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  resetPasswordSubmit() {
    if (this.resetPassword.valid) {
      this.authService.resetPassword(this.resetPassword.value).subscribe(
        response => {
          alert('Password reset successful');
          console.log('Password reset successful');
          this.resetPassword.reset();
          this.resetPasswordVisible = false;
        },
        error => {
          alert('An error occurred while resetting password.');
          console.error('Password reset failed:', error);
        }
      );
    } else {
      alert('Please fill out all required fields correctly.');
      console.error('Password reset failed');
    }
  }

  subscribeToFormChanges(): void {
    this.login.valueChanges.subscribe(() => {
      this.isFormChanged = true;
    });
  }

  get password() {
    return this.login.get('password');
  }

  loginUser() {
    if (this.login.valid) {
      this.authService.login(this.login.value).subscribe(
        response => {
          alert('Login successful');
          console.log('Login successful');
          // Optionally navigate to another page after successful login
          this.router.navigate(['/dashboard']);
        },
        error => {
          alert('Invalid username or password.');
          console.error('Login failed:', error);
        }
      );
    } else {
      alert('Please fill out all required fields correctly.');
      console.error('Login failed');
    }
  }

  toggleResetPasswordForm(event: Event): void {
    event.preventDefault();
    this.resetPasswordVisible = !this.resetPasswordVisible;
    this.loginvisible = !this.loginvisible;
  }

  toggleLogin() {
    this.resetPasswordVisible = false;
    alert('Redirecting to Registration form');
    this.router.navigate(['/registration-form']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToSignup() {
    this.router.navigate(['/registration-form']);
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: any) {
    return this.http.post<any>('/api/login', credentials);
  }

  resetPassword(formData: any) {
    return this.http.post<any>('/api/reset-password', formData);
  }
}



// Working code without urls
// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule} from '@angular/forms';
// import { LoginSignupButtonsComponent } from "../login-signup-buttons/login-signup-buttons.component";
// import { Router } from '@angular/router';
// import { HomeComponent } from "../home/home.component";

// @Component({
//     selector: 'app-login',
//     standalone: true,
//     templateUrl: './login.component.html',
//     styleUrls: ['./login.component.css'],
//     imports: [
//         CommonModule,
//         ReactiveFormsModule,
//         LoginSignupButtonsComponent,
//         HomeComponent
//     ]
// })
// export class LoginComponent implements OnInit {
//   login!: FormGroup;
//   resetPassword!: FormGroup;
//   isFormChanged: boolean = false;
//   passwordVisible: boolean = false; 
//   loginvisible: boolean = true;
//   resetPasswordVisible: boolean = false;

//   constructor(private fb: FormBuilder, private router: Router) { }

//   ngOnInit(): void {
//     this.initializeForm();
//     this.subscribeToFormChanges();
//   }

//   initializeForm(): void {
//     this.login = this.fb.group({
//       loginMethod: ['username', Validators.required], // Default to 'username'
//       username: '', // Initialize as empty
//       email: ['', Validators.email],
//       password: ['', Validators.required]
//     });
//     this.resetPassword = this.fb.group({
//       resetEmail: ['', [Validators.required, Validators.email]],
//       newPassword: ['', Validators.required],
//       confirmPassword: ['', Validators.required]
//     }, { validators: this.passwordMatchValidator });

//   }

//   passwordMatchValidator(formGroup: FormGroup) {
//     const newPassword = formGroup.get('newPassword')?.value;
//     const confirmPassword = formGroup.get('confirmPassword')?.value;
//     if (newPassword !== confirmPassword) {
//       formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
//     } else {
//       formGroup.get('confirmPassword')?.setErrors(null);
//     }
//   }

//   resetPasswordSubmit() {
//     if (this.resetPassword.valid) {
//       // Reset password logic here
//       alert('Password reset successful');
//       console.log('Password reset successful');
//       // Reset the form
//       this.resetPassword.reset();
//       this.resetPasswordVisible = false;
//     } else {
//       alert('Please fill out all required fields correctly.');
//       console.error('Password reset failed');
//     }
//   }

//   subscribeToFormChanges(): void {
//     this.login.valueChanges.subscribe(() => {
//       this.isFormChanged = true;
//     });
//   }

//   get password() {
//     return this.login.get('password');
//   }

//   loginUser() {
    
//     if (this.login.valid) {
//       alert('Login successful');
//       console.log('Login successful');
//     } else {
//       alert('Please fill out all required fields correctly.');
//       console.error('Login failed');
//     }
//   }

//   toggleResetPasswordForm(event: Event): void {
//     event.preventDefault();
//     this.resetPasswordVisible = !this.resetPasswordVisible;
//     this.loginvisible = !this.loginvisible;

//   }
//   toggleLogin() {
//     this.resetPasswordVisible = false; // Hide reset password form
//     alert('Redirecting to Registration form')
//     this.router.navigate(['/registration-form']);
//   }

//   navigateToLogin() {
//     this.router.navigate(['/login']); // Navigate to the login route
//   }

//   navigateToSignup() {
//     this.router.navigate(['/registration-form']);
//   }

//   // Method to toggle password visibility
//   togglePasswordVisibility(): void {
//     this.passwordVisible = !this.passwordVisible;
//   }
// }