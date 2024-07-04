import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom, map } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Todo } from '../interfece/todo';
import { fetchedUser } from '../interfece/fetchedUser';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  userNames: string[] = [];

  currentLoggedInUserID: number = 0;

  constructor(private http: HttpClient) {}
  
  loginWithUsernameAndPassword(userName:string, password:string){
    
    const url = 'http://127.0.0.1:8000/login/';
    const body = {
      username: userName,
      password: password,
    };
    return lastValueFrom(this.http.post(url, body));
  }


  async addTaskIntoBackend(task: Todo){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // const body = JSON.stringify(task);
    const url = 'http://127.0.0.1:8000/tasks/';
    await lastValueFrom(this.http.post(url, task, { headers }));
  }


  async addSubtaskIntoBackend(subtask: any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // const body = JSON.stringify(subtask);
    const url = 'http://127.0.0.1:8000/subtasks/';
    await lastValueFrom(this.http.post(url, subtask, { headers }));
  }


  async fetchUsers() {
    const url = 'http://127.0.0.1:8000/api/public_users/';
    const response = await fetch(url);
    const jsonData = await response.json();
    this.userNames = jsonData.map((user: any) => user.username);
  }
  
  
}
