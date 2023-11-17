import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CompetitionListComponent } from './competition-list/competition-list.component';
import { RegistrationComponent } from './registration/registration.component';


@Component({
  selector: 'app-root',
  standalone: true,
  
  imports: [
    CommonModule, 
    RouterOutlet, 
    CompetitionListComponent,
    RegistrationComponent
  ],

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
}
