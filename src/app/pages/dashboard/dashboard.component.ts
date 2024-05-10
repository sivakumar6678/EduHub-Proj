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
  courses: any[] = [];
  courseContent: any[] = [];
  selectedCourse: any; 
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
    const course = this.enrolledCourses.find(course => course.courseId === courseId);
    if (course) {
      course.showContent = !course.showContent;
      if (course.showContent) {
        this.fetchCourseContent(courseId);
        this.selectedCourse = course;
      } else {
        this.selectedCourse = null;
      }
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
  fetchCourseContent(courseId: number): void {
    this.http.get<any[]>(`http://localhost:8080/auth/course-content/${courseId}`).subscribe(
      (response: any[]) => {
        console.log(response);
        const course = this.enrolledCourses.find(course => course.courseId === courseId);
        if (course) {
          course.courseContent = response;
        }
      },
      (error) => {
        console.error('Error fetching course content:', error);
      }
    );
  }

  showCourseOverview(course: any): void {
    this.selectedCourse = course;
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