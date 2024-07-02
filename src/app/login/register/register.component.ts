import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { UrlService } from '../../service/urls-service.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import { environment } from '../../../environments/environment.development';
import { registerUser } from '../../interfece/register-user';
import { lastValueFrom } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {

  userName: string = '';
  userEmail: string = '';
  password1: string = '';
  password2: string = '';

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  constructor(private urlService: UrlService, private router: Router, private http: HttpClient) {}


  async register() {
    if (this.checkValues()) {
        const url = 'http://127.0.0.1:8000/register/';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let user = this.getUserData();
        const body = JSON.stringify(user);
        try {
            await lastValueFrom(this.http.post(url, body, { headers }));
            this.router.navigateByUrl('/todos');
        } catch (e) {
            console.log('Fehler beim Registrieren', e);
        }
    }
}


  checkValues(){
    return this.userName.length > 3 && this.userEmail.length > 3 && 
      this.password1.length > 3 && this.password1.length > 3 && 
      this.password1 === this.password2;
  }


  getUserData(): registerUser {
    return {
      name: this.userName,
      email: this.userEmail,
      password: this.password1
    };
  }
  
}
