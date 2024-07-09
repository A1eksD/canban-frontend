import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { Todo } from '../interfece/todo';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  userNames: any[] = [];
  currentLoggedInUserID: number = 0;
  allTasks : Todo[] = [];
  currentTask: any = [];
  showTaskBoolean: boolean = false;
  deleteTaskValue: boolean = false;


  constructor(private http: HttpClient) {
  }
  

  loginWithUsernameAndPassword(userName:string, password:string){
    const url = 'http://127.0.0.1:8000/login/';
    const body = {
      username: userName,
      password: password,
    };
    return lastValueFrom(this.http.post(url, body));
  }


  async addTaskIntoBackend(task: Todo) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    });
    const url = 'http://127.0.0.1:8000/api/tasks/';
    await lastValueFrom(this.http.post(url, task, { headers }));
  }


  async addSubtaskIntoBackend(subtask: any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = 'http://127.0.0.1:8000/api/subtasks/';
    await lastValueFrom(this.http.post(url, subtask, { headers }));
  }


  async startFetchData() {
    this.fetchTasks();
    const url = 'http://127.0.0.1:8000/api/public_users/';
    const response = await fetch(url);
    const jsonData = await response.json();
    this.userNames = jsonData;
    return jsonData
  }
  

  fetchTasks(): Observable<Todo[]> {
    const url = 'http://127.0.0.1:8000/api/tasks/';
    return this.http.get<Todo[]>(url);
  }


  updateTaskCategors( task: Todo, id: number , category: string){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `http://127.0.0.1:8000/api/tasks/${id}/`;
    const body = { 
      title: task.title,
      creator: task.creator,
      category: category,
      subtasks: task.subtasks,
      assigned_users: task.assigned_users,
    };
    return lastValueFrom(this.http.put(url, body, { headers }));
  }

  
  updateSubtaskValue( currentSubtask: any, subtaskValue: string){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `http://127.0.0.1:8000/api/subtasks/${currentSubtask.id}/`;
    const body = { 
      name: subtaskValue
    };
    return lastValueFrom(this.http.put(url, body, { headers }));
  }


  deleteSubtask(subtaskId: number) {
    const url = `http://127.0.0.1:8000/api/tasks/${subtaskId}/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(url, { headers });
  }
}
