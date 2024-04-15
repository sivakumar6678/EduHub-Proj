import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginSignupButtonsComponent } from "../login-signup-buttons/login-signup-buttons.component";
@Component({
    selector: 'app-registration-form',
    standalone: true,
    templateUrl: './registration-form.component.html',
    styleUrls: ['./registration-form.component.css'],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LoginSignupButtonsComponent
    ]
})

export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  isFormChanged: boolean = false; 

  constructor(private fb: FormBuilder, private router: Router) { }
  ngOnInit(): void {
    this.initializeForm();
    this.subscribeToFormChanges();
  }

  initializeForm(): void {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  subscribeToFormChanges(): void {
    this.registrationForm.valueChanges.subscribe(() => {
      this.isFormChanged = true;
    });
  }

  get username() {
    return this.registrationForm.get('username');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }

  passwordsMatch(): boolean {
    const password = this.registrationForm.get('password')?.value;
    const confirmPassword = this.registrationForm.get('confirmPassword')?.value;
    return password === confirmPassword; // Use strict comparison (===)
  }
  

  registerUser() {
    if (this.registrationForm.valid && this.passwordsMatch()) {
      alert('Registration successful');
      console.log('Registration successful');
    } else {
      alert('Please fill out all required fields correctly and ensure passwords match.');
      console.error('Registration failed');
    }
  }

  toggleLogin() {
    alert('Redirecting to login page');
    this.router.navigate(['/login']);
  }


  navigateToLogin() {
    this.router.navigate(['/login']); // Navigate to the login route
  }

  navigateToSignup() {
    this.router.navigate(['/registration-form']);
  }
}