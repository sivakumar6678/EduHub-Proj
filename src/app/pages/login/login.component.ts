import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
import { LoginSignupButtonsComponent } from "../login-signup-buttons/login-signup-buttons.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginSignupButtonsComponent
  ]
})
export class LoginComponent implements OnInit {
  login!: FormGroup;
  isFormChanged: boolean = false;
  passwordVisible: boolean = false; // Add property to track password visibility

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.subscribeToFormChanges();
  }

  initializeForm(): void {
    this.login = this.fb.group({
      loginMethod: ['username', Validators.required], // Default to 'username'
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
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
      alert('Login successful');
      console.log('Login successful');
    } else {
      alert('Please fill out all required fields correctly.');
      console.error('Login failed');
    }
  }

  toggleLogin() {
    alert('Redirecting to Registration page');
    this.router.navigate(['/registration-form']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']); // Navigate to the login route
  }

  navigateToSignup() {
    this.router.navigate(['/registration-form']);
    // Handle navigation to the signup page, if needed
  }

  // Method to toggle password visibility
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
