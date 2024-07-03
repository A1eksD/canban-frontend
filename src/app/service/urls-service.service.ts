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

  private baseUrl  = 'http://127.0.0.1:8000/admin/auth/user/';
  users: fetchedUser[] = [];

  currentLoggedInUserID: number = 0;

  constructor(private http: HttpClient) { 
    setInterval(() => {
      console.log(this.users);
    }, 2000)
  }
  
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


  startFetshingUsers(){
    return this.http.get<fetchedUser[]>(this.baseUrl).pipe(
      map(data => {
        this.users = data;
        return this.users;
      })
    );
  }
}
