import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistrationFormComponent } from './pages/registration-form/registration-form.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginSignupButtonsComponent } from "./pages/login-signup-buttons/login-signup-buttons.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, DashboardComponent, RegistrationFormComponent, LoginComponent, LoginSignupButtonsComponent]
})
export class AppComponent {
  title = 'EduHub';
}
