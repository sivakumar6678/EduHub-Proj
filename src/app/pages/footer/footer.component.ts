import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  standalone:true,
  imports:[FontAwesomeModule]
})
export class FooterComponent {
  title = 'EduHub';

}
