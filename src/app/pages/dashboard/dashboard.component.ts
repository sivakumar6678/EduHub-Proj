import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CoursesComponent } from '../courses/courses.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone:true,
  imports:[HttpClientModule,CommonModule,RouterModule,CoursesComponent]
})
export class DashboardComponent implements OnInit {
  categories: any[] = [];
  courses: any[] = [];
  courseContent: any[] = [];
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
    // this.initializeDarkModeToggle();
  }

  fetchCategories(): void {
    this.http.get<any[]>('http://localhost:8080/auth/categories').subscribe(
      (response: any[]) => {
        this.categories = response.map(categoryString => categoryString.split(', '));
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  fetchCourseContent(courseId: number): void {
    this.http.get<any[]>(`http://localhost:8080/auth/course-content/${courseId}`).subscribe(
      (response: any[]) => {
        console.log(response); // Log the response to see its structure
        this.courseContent = response;
      },
      (error) => {
        console.error('Error fetching course content:', error);
      }
    );
  }
  
  
  

  toggleCourseContent(courseId: number): void {
    // Set showContent to false for all courses
    this.courses.forEach(course => {
      course.showContent = false;
    });
  
    const index = this.courses.findIndex(course => course.courseId === courseId);
    if (index !== -1) {
      this.courses[index].showContent = !this.courses[index].showContent;
      if (this.courses[index].showContent) {
        this.fetchCourseContent(courseId);
      }
    }
  }
  
  

  navigateToCourses(categoryId: number): void {
    if (!categoryId) {
      console.error('Invalid category ID');
      return;
    }
    
    this.http.get<any[]>(`http://localhost:8080/auth/${categoryId}`).subscribe(
      (response: any[]) => {
        this.courses = response;
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }






  // initializeDarkModeToggle(): void {
  //   const toggleBtn = document.getElementById('toggle-btn');

  //   if (!toggleBtn) {
  //     console.error("Toggle button not found");
  //     return;
  //   }

  //   const body = document.body;
  //   let darkMode = localStorage.getItem('dark-mode');

  //   const enableDarkMode = () => {
  //     toggleBtn.classList.replace('fa-sun', 'fa-moon');
  //     body.classList.add('dark');
  //     localStorage.setItem('dark-mode', 'enabled');
  //   };

  //   const disableDarkMode = () => {
  //     toggleBtn.classList.replace('fa-moon', 'fa-sun');
  //     body.classList.remove('dark');
  //     localStorage.setItem('dark-mode', 'disabled');
  //   };

  //   if (darkMode === 'enabled') {
  //     enableDarkMode();
  //   }

  //   toggleBtn.addEventListener('click', () => {
  //     darkMode = localStorage.getItem('dark-mode');
  //     if (darkMode === 'disabled') {
  //       enableDarkMode();
  //     } else {
  //       disableDarkMode();
  //     }
  //   });
  // }
}