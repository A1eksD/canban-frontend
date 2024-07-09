import { Component, OnInit, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { UrlService } from '../../service/urls-service.service';
import { fetchedUser } from '../../interfece/fetchedUser';

@Component({
  selector: 'app-create-todos',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    CommonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDividerModule,
    MatDividerModule,
  ],
  templateUrl: './create-todos.component.html',
  styleUrl: './create-todos.component.scss',
})


export class CreateTodosComponent implements OnInit{
  hideSingleSelectionIndicator = signal(false);
  hideMultipleSelectionIndicator = signal(false);
  created: string = '';
  title: string = '';
  description: string = '';
  priority: number = 1;
  creator: number = 1;
  subtasksValue: string = '';
  subtasks: any[] = [];
  assigned_users : fetchedUser[]= [];
  chackedUserIDs: number[] = [];

  constructor(public UrlService: UrlService) {}

  ngOnInit() {
    this.UrlService.startFetchData().then(jsonData => {
        this.UrlService.userNames = jsonData;
    });
}
  toggleSingleSelectionIndicator() {
    this.hideSingleSelectionIndicator.update((value) => !value);
  }


  toggleMultipleSelectionIndicator() {
    this.hideMultipleSelectionIndicator.update((value) => !value);
  }


  checkPrio(number: number) {
    this.priority = number;
  }


  addSubtask(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const subtask_Value = {
        "name": this.subtasksValue,
        "is_checked": false,
      }
      this.subtasks.push(subtask_Value);
      this.subtasksValue = '';
    }
  }


  deleteSubtask(index: number) {
    this.subtasks.splice(index, 1);
  }


  async saveTask() {

    const task = {
      created: this.getDate(),
      title: this.title,
      description: this.description,
      priority: this.priority,
      creator: +localStorage.getItem('userID')!,
      subtasks: this.subtasks || [],
      assigned_users: this.assigned_users.map(user => user.id) || [],
      category: 'todo'
    };
    try {
      await this.UrlService.addTaskIntoBackend(task);
      location.reload();
    } catch (error) {
      console.error(error);
    }
    this.clearValues();
  }


  getDate() {
    // const myDate = new Date();
    // return myDate.toLocaleDateString();

    const now = new Date();
    const jahr = now.getFullYear();
    const monat = now.getMonth() + 1;
    const tag = now.getDate();
    const stunden = now.getHours();
    const minuten = now.getMinutes();
    const sekunden = now.getSeconds();
    const millisekunden = now.getMilliseconds();

    const formatierterJahr = jahr.toString().padStart(4, '0');
    const formatierterMonat = monat.toString().padStart(2, '0');
    const formatierterTag = tag.toString().padStart(2, '0');
    const formatierteStunden = stunden.toString().padStart(2, '0');
    const formatierteMinuten = minuten.toString().padStart(2, '0');
    const formatierteSekunden = sekunden.toString().padStart(2, '0');
    const formatierteMillisekunden = millisekunden.toString().padStart(3, '0');

    return `${formatierterJahr}-${formatierterMonat}-${formatierterTag}T${formatierteStunden}:${formatierteMinuten}:${formatierteSekunden}.${formatierteMillisekunden}Z`;
  }


  clearValues() {
    this.created = '';
    this.title = '';
    this.description = '';
    this.priority = 1;
    this.creator = 1;
    this.subtasksValue = '';
    this.subtasks = [];
    this.assigned_users = [];
  }


  selectUser(user: fetchedUser){
    const isUserChacked = this.assigned_users.some(u => u.id === user.id);
    if(!isUserChacked){
      this.assigned_users.push(user);
    }
  }

  
  deleteSelectedUser(index:number){
    this.assigned_users.splice(index, 1);
  }


  
  showUsers(){
    console.log(this.UrlService.userNames);
    
  }
}
