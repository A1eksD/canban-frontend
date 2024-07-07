import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UrlService } from '../../../service/urls-service.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-show-card-details',
  standalone: true,
  imports: [FormsModule, CommonModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './show-card-details.component.html',
  styleUrl: './show-card-details.component.scss'
})
export class ShowCardDetailsComponent {

  subtaskValue: string = '';
  showEditWindow: boolean = false;
  currentSubtask: any = '';

  constructor(public urlService: UrlService) {}

  editSubtask(subtask: any, event: Event){
    event.stopPropagation();
    this.showEditWindow = !this.showEditWindow;
    this.subtaskValue = subtask.name;
    this.currentSubtask = subtask;
  }

  deleteSubtask(event: Event){
    event.stopPropagation();
    this.urlService.deleteSubtask(this.urlService.currentTask.id);
    this.urlService.showTaskBoolean = false;
  }


  closeSubtask(event: Event){
    event.stopPropagation();
    this.urlService.showTaskBoolean = false
  }

  saveEditSubtask(event: Event){
    event.stopPropagation();
    this.showEditWindow = !this.showEditWindow;
    this.urlService.updateSubtaskValue(this.currentSubtask ,this.subtaskValue);
  }

  editSubtaskInout( event: Event){
    event.stopPropagation();
  }

  showUserName(item: number){
    let userName = this.urlService.userNames.find((user: any) => user.id === item);
    if(userName){
      return userName.username
    }
  }
}
