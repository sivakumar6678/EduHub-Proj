import { Component, OnInit, Input,ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router ,RouterModule} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../../authentication.service';
import { MessageService } from 'primeng/api';
@Component({
  // selector: 'app-courses',
  // standalone: true,
  // imports: [LoginComponent, CommonModule, FormsModule,RouterModule,ToastModule,ButtonModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers: [MessageService]
})
export class CoursesComponent implements OnInit {
  categories: any[] = [];
  courses: any[] = [];
  courseContent: any[] = [];
  filteredCategories: any[] = [];
  searchTerm: string = '';
  selectedCourseId: number = 0;
  showEnrollment: boolean = false;
  selectedcategory: any;
  coursecatelog: boolean = false;
  constructor(private http: HttpClient,
              public authService: AuthenticationService,
              public router:Router,
            private messageService:MessageService) { }

  ngOnInit(): void {
    this.fetchCategories();
  }
  toggleEnrollment(): void {
    this.showEnrollment = !this.showEnrollment;
  }

  // for enrollment of courses
enrollCourse(courseId: number): void {
  const token = this.authService.getToken();
  if (!token) {
    console.error('No token available for courses enrollment');
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
        const responseBody = response.body as { message: string }; // Type assertion          
        if (responseBody && responseBody.message === 'Re-Enrolled Successfully') {
          this.messageService.add({key:'toast1',severity:'success', summary:'Enrolled', detail:'Course Re-Enrolled successfully'});
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          },2000);
          // alert('Enrolled successfully!');
        } else if(responseBody && responseBody.message === 'Enrolled Successfully') {
          this.messageService.add({key:'toast1',severity:'success', summary:'Enrolled', detail:'Course Enrolled successfully'});
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          },2000);
          // alert('Enrolled successfully!');
        }
      },
      (error) => {
        console.error('Error enrolling course:', error);
        if (error.status === 400) {
          if (error.error && error.error.message === 'User is already enrolled') {
            // alert('Course already enrolled ');
            this.messageService.add({key:'toast1',severity:'warn', summary:'Already Enrolled', detail:'Course already enrolled'});
            setTimeout(() => {
            this.router.navigate(['/dashboard']);
            },2000);
          } else {
            this.messageService.add({key:'toast1',severity:'error', summary:'Failed', detail:'Failed to enroll. Please try again!'});
            // alert('Failed to enroll. Please try again.');

          }
        } else {
          this.messageService.add({key:'toast1',severity:'error', summary:'Failed', detail:'An unexpected error occurred. Please try again later.'});
          // alert('An unexpected error occurred. Please try again later.');
        }
        console.error('Error headers:', error.headers);
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
        this.showEnrollment = false; // Ensure enrollment section is hidden
        this.selectedcategory = category[1] + ' Courses';
        this.coursecatelog = true;
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
    if (index !== -1) {
      this.courses[index].showContent = !this.courses[index].showContent;
      if (this.courses[index].showContent) {
        this.fetchCourseContent(courseId);
        this.selectedCourseId = courseId;
        this.showEnrollment = true; // show enrollment section
  
      }
  
    }
  }
}