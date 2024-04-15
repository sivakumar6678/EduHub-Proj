import { Routes } from '@angular/router';
import { RegistrationFormComponent } from './pages/registration-form/registration-form.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: '/registration-form', pathMatch: 'full' },
    { path: 'registration-form', component: RegistrationFormComponent },
    { path: 'login', component: LoginComponent },
];
