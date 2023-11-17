import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',

  template: `
    @if(showForm){
      <form [formGroup]="profileForm" (ngSubmit)="handleSubmit()">
        <input 
          type="text" 
          formControlName="name" 
          [placeholder]="profileForm.get('name')?.hasError('required') && profileForm.get('name')?.touched ? 'Name is required!' : 'Enter your name'" />

        <input 
          type="text" 
          formControlName="lastname" 
          [placeholder]="profileForm.get('lastname')?.hasError('required') && profileForm.get('lastname')?.touched ? 'Last name is required!' : 'Enter your last name'" />

        <input 
          type="date" 
          formControlName="birthdate" 
          [placeholder]="profileForm.get('birthdate')?.hasError('required') && profileForm.get('birthdate')?.touched ? 'Birthdate is required!' : 'Enter your birthdate'" />

        <input 
          type="email"
          formControlName="email"
          [placeholder]="profileForm.get('email')?.hasError('required') && profileForm.get('email')?.touched ? 'Please enter a valid email!' : 'Enter your email'" />

        <input 
          type="number
          " formControlName="Zip"
          [maxlength]="4"
          [placeholder]="profileForm.get('Zip')?.hasError('required') && profileForm.get('Zip')?.touched ? 'Please enter a Zip code!' : 'Enter your Zip code'" />
          
          
          <input 
          type="checkbox"
          formControlName="termsAndConditions"
          >
          <div>
          <label for="termsAndConditions">I agree to the terms and conditions</label>
          </div>
          @if(profileForm.get('termsAndConditions')?.hasError('requiredTrue') && profileForm.get('termsAndConditions')?.touched){
            <ng-container>
              <div style="color: red;">You must accept the terms and conditions.</div>
            </ng-container> 
          }




          <button mat-raised-button type="submit" [disabled]="profileForm.invalid">Submit</button>
      </form>
    }
    <button class="register-button" (click)="toggleForm()">
      {{ showForm ? 'Close' : 'Register' }}
    </button>
  `,
  standalone: true,
  imports: [ReactiveFormsModule],
  styleUrls: ['./registration.component.css'],
})


export class RegistrationComponent {
  showForm = false;

  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    birthdate: new FormControl('', [Validators.required, this.ageValidator]),
    email: new FormControl('', [Validators.required, Validators.email]),
    Zip: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}$/),]),
    termsAndConditions: new FormControl(false, [Validators.requiredTrue]),

  });
  termsAndConditions: any;

  toggleForm() {
    this.showForm = !this.showForm;
  }

  //Custom Validator
  ageValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const birthdate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear();

    if (age < 14) {
      // Trigger an alert if age is less than 14
      window.alert('You must be at least 14 years old.');
      return { 'ageInvalid': true };
    }

    return null;
  }
  //Custom Validtor





  //Submit which takes the input values and creates object logged in the console
  handleSubmit() {
    const termsAndConditionsControl = this.profileForm.get('termsAndConditions');
  
    if (this.profileForm.valid && termsAndConditionsControl?.value) {
      const formData = {
        name: this.profileForm.value.name,
        lastname: this.profileForm.value.lastname,
        birthdate: this.profileForm.value.birthdate,
        email: this.profileForm.value.email,
        Zip: this.profileForm.value.Zip,
        termsAndConditions: termsAndConditionsControl.value,
      };
      this.profileForm.reset({
        termsAndConditions: false,
      });
      console.log(formData);
    } else {
      // Mark the form controls as touched to display validation messages
      this.profileForm.markAllAsTouched();
      if (termsAndConditionsControl) {
        termsAndConditionsControl.markAsTouched();
      }
    }
  }
//Submit which takes the input values and creates object logged in the console
}