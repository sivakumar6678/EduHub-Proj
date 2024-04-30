import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  title = 'EduHub';
  
}
