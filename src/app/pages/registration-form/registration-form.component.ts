import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  isFormChanged: boolean = false;

  constructor(private fb: FormBuilder, private router: Router,private http:HttpClient) { }

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
      let register = {
        username: this.registrationForm.get('username')?.value,
        email: this.registrationForm.get('email')?.value,
        password: this.registrationForm.get('password')?.value
      };
      this.http.post('http://localhost:8085/api/', register,{responseType: 'text'}).subscribe((response: any) => {
        console.log(response);
        this.router.navigate(['/login']);
      });
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
