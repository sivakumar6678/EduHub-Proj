import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../services/registration.service'; // Assuming you have a service named 'RegistrationService'
import { LoginSignupButtonsComponent } from '../login-signup-buttons/login-signup-buttons.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
  imports: [LoginSignupButtonsComponent,ReactiveFormsModule,CommonModule]
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  isFormChanged: boolean = false;

  constructor(private fb: FormBuilder, private registrationService: RegistrationService, private router: Router) { }

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
      // Make API call to register user
      this.registrationService.registerUser(this.registrationForm.value).subscribe(
        (response) => {
          alert('Registration successful');
          console.log('Registration successful');
        },
        (error) => {
          console.error('Registration failed', error);
          alert('Registration failed');
        }
      );
    } else {
      alert('Please fill out all required fields correctly and ensure passwords match.');
      console.error('Registration failed');
    }
  }
  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  toggleLogin() {
    this.router.navigate(['/registration-form']);
  }
}
