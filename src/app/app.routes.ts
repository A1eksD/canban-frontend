import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DisplayTodosComponent } from './display-todos/display-todos.component';
import { RegisterComponent } from './login/register/register.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'todos', component: DisplayTodosComponent}
];
