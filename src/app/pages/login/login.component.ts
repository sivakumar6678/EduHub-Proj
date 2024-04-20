import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginSignupButtonsComponent } from '../login-signup-buttons/login-signup-buttons.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HomeComponent } from '../home/home.component';
import { RegistrationFormComponent } from '../registration-form/registration-form.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone:true,
  imports:[LoginSignupButtonsComponent,HeaderComponent,FooterComponent,HomeComponent,DashboardComponent,RegistrationFormComponent,HttpClientModule,CommonModule,ReactiveFormsModule]
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
  // password: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.initializeLoginForm();
    this.initializeResetPasswordForm();
    this.subscribeToFormChanges();
  }

  initializeLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  initializeResetPasswordForm(): void {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }


  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
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
      let login = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      };
      this.http.post('http://localhost:8085/api/', login, { responseType: 'text' }).subscribe((response: any) => {
        console.log(response);
        this.router.navigate(['/dashboard']);
      });
      
    } else {
      this.errorMessage = 'Please fill out all required fields.';
    }
  }

  resetPassword(): void {
    if (this.resetPasswordForm.valid) {
      this.successMessage = 'Password reset link sent to email address.';
      // this.resetPasswordForm.reset();
      this.isResetPasswordFormChanged = false;
      setTimeout(() => {
        this.resetPasswordVisible = false;
      }, 3000);
      let resetpassword = {
      email: this.resetPasswordForm.get('email')?.value,
      password: this.resetPasswordForm.get('password')?.value
      };
      this.http.post('http://localhost:8085/api/', resetpassword, { responseType: 'text' }).subscribe((response: any) => {
        console.log(response);
        this.router.navigate(['/login']);
      });
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  navigateToSignup() {
    this.router.navigate(['/registration-form']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  toggleResetPasswordForm(event: Event): void {
    event.preventDefault();
    this.resetPasswordVisible = !this.resetPasswordVisible;
    this.loginvisible = false;
  }

  toggleLogin() {
    alert('Redirecting to Reigistration form')
    this.router.navigate(['/registration-form']);
  }
}
