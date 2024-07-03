import { Component } from '@angular/core';
import { CreateTodosComponent } from './create-todos/create-todos.component';
import { ShowTodosComponent } from './show-todos/show-todos.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-display-todos',
  standalone: true,
  imports: [CreateTodosComponent, ShowTodosComponent, FormsModule, CommonModule ],
  templateUrl: './display-todos.component.html',
  styleUrl: './display-todos.component.scss'
})
export class DisplayTodosComponent {

  constructor(private http: HttpClient, private router: Router){}
  logout(){
    this.http
    .post('http://127.0.0.1:8000/logout/', {})
    .pipe(
      catchError((error) => {
        console.error('Error logging out:', error);
        return throwError(() => error);
      })
    )
    .subscribe(() => {
      localStorage.clear();
      this.router.navigate(['/login']);
      console.log('Successfully logged out');
    });
  }
}
