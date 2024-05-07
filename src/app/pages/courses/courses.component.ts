import { Component,OnInit,Input } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule


@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [LoginComponent,CommonModule,FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent  {
  categories: any[] = [];
  courses: any[] = [];
  courseContent: any[] = [];
  filteredCategories: any[] = [];
  searchTerm: string = '';

  ngOnInit(): void {
    this.fetchCategories();
  }
  constructor(
    private http: HttpClient,
    private router: Router,

    private route: ActivatedRoute
  ) { }


  fetchCategories(): void {
    this.http.get<any[]>('http://localhost:8080/auth/categories').subscribe(
      (response: any[]) => {
        this.categories = response.map(categoryString => categoryString.split(', '));
        this.filteredCategories = this.categories.slice(); // Initially, set filteredCategories to all categories
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  filterCategories(): void {
    this.filteredCategories = this.categories.filter(category => {
      return category[1].toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }
  toggleCategory(category: any): void {
    // Fetch courses based on selected category
    const categoryId = category[0];
    this.http.get<any[]>(`http://localhost:8080/auth/${categoryId}`).subscribe(
      (response: any[]) => {
        this.courses = response;
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
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
  toggleCourseContent(courseId: number): void {
    // Set showContent to false for all courses
    this.courses.forEach(course => {
      course.showContent = false;
    });
  
    const index = this.courses.findIndex(course => course.courseId === courseId);
    if (index !== -1) {
      this.courses[index].showContent = !this.courses[index].showContent;
      if (this.courses[index].showContent) {
      }
    }
  }


}