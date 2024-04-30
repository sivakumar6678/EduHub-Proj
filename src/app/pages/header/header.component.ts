import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone:true,
  imports:[RouterOutlet,FontAwesomeModule,CommonModule,RouterModule,HttpClientModule],
})
export class HeaderComponent {
  categories: any[] = [];

  constructor(  public authService: AuthenticationService,  
                private http: HttpClient

  ) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/auth/categories').subscribe(
  (response: any[]) => {
    this.categories = response.map(categoryString => categoryString.split(', '));
    // console.log('categories:', this.categories);
  },
  (error) => {
    console.error('Error fetching categories:', error);
  }
);

}
logout(): void {
  // Logic to perform logout
  this.authService.setLoginStatus(false);
}
}
