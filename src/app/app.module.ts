import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { LoginSignupButtonsComponent } from './pages/login-signup-buttons/login-signup-buttons.component';

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LoginSignupButtonsComponent
  ],
  // other configuration goes here
})
export class AppModule { }