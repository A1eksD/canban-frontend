import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Todo } from '../interfece/todo';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  currentLoggedInUserID: number = 0;

  constructor(private http: HttpClient) { }
  
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
    const body = JSON.stringify(task);
    const url = 'http://127.0.0.1:8000/tasks/';
    await lastValueFrom(this.http.post(url, body, { headers }));
  }
}
