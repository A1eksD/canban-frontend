import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { Todo } from '../interfece/todo';
import { UserToken } from '../interfece/user-token';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  userNames: any[] = [];
  currentLoggedInUserID: number = 0;
  allTasks : Todo[] = [];
  currentTask: any = [];
  showTaskBoolean: boolean = false;

  constructor(private http: HttpClient) {
    // setInterval(() => {
    //   console.log('ddddddddddd',this.allTasks);
    // }, 2000);
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
    const url = 'http://127.0.0.1:8000/api/tasks/';
    await lastValueFrom(this.http.post(url, task, { headers }));
  }


  async addSubtaskIntoBackend(subtask: any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // const body = JSON.stringify(subtask);
    const url = 'http://127.0.0.1:8000/api/subtasks/';
    await lastValueFrom(this.http.post(url, subtask, { headers }));
  }


  async startFetchData() {
    this.fetchTasks();
    const url = 'http://127.0.0.1:8000/api/public_users/';
    const response = await fetch(url);
    const jsonData = await response.json();
    this.userNames = jsonData;
  }
  

  // async fetchTasks(){
  //   const url = 'http://127.0.0.1:8000/api/tasks/';
  //   const response = await fetch(url);
  //   const jsonData = await response.json();
  //   this.allTasks = jsonData;
  //   console.log(this.allTasks);
  // }

  fetchTasks(): Observable<Todo[]> {
    const url = 'http://127.0.0.1:8000/api/tasks/';
    return this.http.get<Todo[]>(url);
  }


  updateTaskCategors( task: Todo, id: number , category: string){
    const url = `http://127.0.0.1:8000/api/tasks/${id}/`;
    const body = { 
      title: task.title,
      creator: task.creator,
      category: category,
      subtasks: task.subtasks,
      assigned_users: task.assigned_users,
    };
    return lastValueFrom(this.http.put(url, body));
  }
}
