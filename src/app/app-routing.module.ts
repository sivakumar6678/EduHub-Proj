import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { LoginSignupButtonsComponent } from './pages/login-signup-buttons/login-signup-buttons.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { RegistrationFormComponent } from './pages/registration-form/registration-form.component';
import { AuthenticationService } from './authentication.service';
import { MessageService } from 'primeng/api';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'registration-form', component: RegistrationFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'courses', component: CoursesComponent }
];

@NgModule({
  declarations: [
    LoginComponent,
    LoginSignupButtonsComponent,
    HomeComponent,
    DashboardComponent,
    CoursesComponent,
    RegistrationFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CommonModule,
    ToastModule,
    ButtonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthenticationService, MessageService],
})
export class AppRoutingModule { }
