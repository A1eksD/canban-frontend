import { Component } from '@angular/core';
import { CreateTodosComponent } from './create-todos/create-todos.component';
import { ShowTodosComponent } from './show-todos/show-todos.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display-todos',
  standalone: true,
  imports: [CreateTodosComponent, ShowTodosComponent, FormsModule, CommonModule ],
  templateUrl: './display-todos.component.html',
  styleUrl: './display-todos.component.scss'
})
export class DisplayTodosComponent {

}
