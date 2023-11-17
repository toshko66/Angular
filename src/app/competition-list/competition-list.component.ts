
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';  // Adjust the path accordingly
import { Competition } from '../models/competition';  // Adjust the path accordingly
import { MatCardModule } from '@angular/material/card';
import { RegistrationComponent } from '../registration/registration.component';







@Component({
  selector: 'app-competition-list',
  standalone:true,
  imports:[RegistrationComponent,MatCardModule],
  template: `<h2>Competitions</h2>

  @if(competitions && competitions.length > 0;){
    <ng-container>
    <div class="card-container">
    @for(competition of competitions; track competition.id){
        <mat-card class="example-card">
          <mat-card-header>
            <mat-card-title>{{ competition.name }}</mat-card-title>
            <!-- Add additional header details if needed -->
          </mat-card-header>
          <mat-card-content>
            <p>Description: {{ competition.description }}</p>
            <p>Start Date: {{ competition.startDate }}</p>
            <p>End Date: {{ competition.endDate }}</p>
          </mat-card-content>
          <app-registration></app-registration>
        </mat-card>
    

      }
    </div>
  </ng-container>
}@else {
  <ng-template #noCompetitions>
      <p>No competitions available. Please try again later.</p>
  </ng-template>}
  
  
  
  
  <br>`,
  styleUrls: ['./competition-list.component.css'],
})
export class CompetitionListComponent implements OnInit {
  competitions: Competition []= [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getCompetitions().subscribe({
        next:(value)=>{
          const parsedCompetitions = JSON.parse(JSON.stringify(value));
          this.competitions = parsedCompetitions;
          console.log('My Object:',parsedCompetitions)
        },
        
        error: err => {console.error('Error fetching competitions:',err);},

      }
    )
  };

  
}
