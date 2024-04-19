import { RegistrationFormComponent } from './pages/registration-form/registration-form.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'registration-form', component: RegistrationFormComponent },
    { path: 'login', component: LoginComponent },
];
@NgModule({

    imports: [RouterModule.forRoot(routes)],
  
    exports: [RouterModule]
  
  })
  
  export class AppRoutingModule { }