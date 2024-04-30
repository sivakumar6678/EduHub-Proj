import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone:true,
  imports:[HttpClientModule,CommonModule]
})
export class DashboardComponent implements OnInit {
  categories: any[] = [];

  constructor(private http: HttpClient) { }

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
  
}