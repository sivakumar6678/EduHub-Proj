import { Component,OnInit,Input } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [LoginComponent,CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent  {
  // courses: any[] = [];
  @Input() courses: any[] = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }


}