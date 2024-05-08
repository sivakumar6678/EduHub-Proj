import { Component, OnInit, Input } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { ActivatedRoute, Router ,RouterModule} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [LoginComponent, CommonModule, FormsModule,RouterModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  categories: any[] = [];
  courses: any[] = [];
  courseContent: any[] = [];
  filteredCategories: any[] = [];
  searchTerm: string = '';
  selectedCourseId: number = 0;

  constructor(private http: HttpClient,
              public authService: AuthenticationService,
              public router:Router) { }

  ngOnInit(): void {
    this.fetchCategories();
  }

  // for enrollment of courses
  enrollCourse(courseId: number): void {
    const token = this.authService.getToken();
    if (!token) {
      console.error('No token available');
      return;
    }
    const enrollmentDate = new Date().toISOString().split('T')[0];   
    const apiUrl = 'http://localhost:8080/api/enroll';
    const requestBody = {
      courseId: courseId.toString(), // Convert courseId to string
      enrollmentDate: enrollmentDate
    };
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    this.http.post(apiUrl, requestBody, { headers, observe: 'response' })
     .subscribe(
        (response) => {
          console.log('Enrolled successfully:', response);
          this.router.navigate(['/dashboard']);

        },
        (error) => {
          console.error('Error enrolling course:', error);
          if (error.headers instanceof HttpHeaders) {
            console.error('Error headers:', error.headers);
          }
          console.error('Error details:', error.error);
        }
      );
  }
  
  

  // for getting categories
  fetchCategories(): void {
    this.http.get<any[]>('http://localhost:8080/auth/categories').subscribe(
      (response: any[]) => {
        this.categories = response.map(categoryString => categoryString.split(', '));
        this.filteredCategories = this.categories.slice();
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  // for filtering categories
  filterCategories(): void {
    this.filteredCategories = this.categories.filter(category => {
      return category[1].toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  // for toggling categories means showing and hiding categories
  toggleCategory(category: any): void {
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

  // get the content of categories
  fetchCourseContent(courseId: number): void {
    this.http.get<any[]>(`http://localhost:8080/auth/course-content/${courseId}`).subscribe(
      (response: any[]) => {
        console.log(response);
        this.courseContent = response;
      },
      (error) => {
        console.error('Error fetching course content:', error);
      }
    );
  }

  toggleCourseContent(courseId: number): void {
    this.courses.forEach(course => {
      course.showContent = false;
    });

    const index = this.courses.findIndex(course => course.courseId === courseId);
    if (index!== -1) {
      this.courses[index].showContent =!this.courses[index].showContent;
      if (this.courses[index].showContent) {
        this.fetchCourseContent(courseId);
        this.selectedCourseId = courseId;
      }
    }
  }
}