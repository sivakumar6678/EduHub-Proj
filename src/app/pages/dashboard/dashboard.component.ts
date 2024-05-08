import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CoursesComponent } from '../courses/courses.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone:true,
  imports:[HttpClientModule,CommonModule,RouterModule,CoursesComponent,FormsModule]
})
export class DashboardComponent implements OnInit {
  categories: any[] = [];
  enrolledCourses: any[] = []; 
  courses: any[] = [
    { courseId: 1, courseName: 'Course 1', progress: 0 },
    { courseId: 2, courseName: 'Course 2', progress: 0 },
    // Add more courses as needed
  ];
  courseContent: any[] = [];
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    // this.initializeDarkModeToggle();
    this.fetchEnrolledCourses();
  }
  toggleCourseContent(courseId: number): void {
    const course = this.courses.find(course => course.courseId === courseId);
    if (course) {
      course.showContent = !course.showContent;
    }
  }

  fetchEnrolledCourses(): void {
    const token = this.authService.getToken();

    if (!token) {
      console.error('No token available');
      return;
    }

    const apiUrl = 'http://localhost:8080/api/get-enrolled-courses';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<any[]>(apiUrl, { headers }).subscribe(
      (courses) => {
        this.enrolledCourses = courses;
      },
      (error) => {
        console.error('Error fetching enrolled courses:', error);
      }
    );
  }

  
  

 
  






  initializeDarkModeToggle(): void {
    const toggleBtn = document.getElementById('toggle-btn');

    if (!toggleBtn) {
      console.error("Toggle button not found");
      return;
    }

    const body = document.body;
    let darkMode = localStorage.getItem('dark-mode');

    const enableDarkMode = () => {
      toggleBtn.classList.replace('fa-sun', 'fa-moon');
      body.classList.add('dark');
      localStorage.setItem('dark-mode', 'enabled');
    };

    const disableDarkMode = () => {
      toggleBtn.classList.replace('fa-moon', 'fa-sun');
      body.classList.remove('dark');
      localStorage.setItem('dark-mode', 'disabled');
    };

    if (darkMode === 'enabled') {
      enableDarkMode();
    }

    toggleBtn.addEventListener('click', () => {
      darkMode = localStorage.getItem('dark-mode');
      if (darkMode === 'disabled') {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
    });
  }
}