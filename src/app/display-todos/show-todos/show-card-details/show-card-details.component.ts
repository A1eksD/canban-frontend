import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UrlService } from '../../../service/urls-service.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-show-card-details',
  standalone: true,
  imports: [FormsModule, CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './show-card-details.component.html',
  styleUrl: './show-card-details.component.scss'
})
export class ShowCardDetailsComponent {

  subtaskValue: string = '';

  constructor(public urlService: UrlService) {}

  editSubtask(subtask: any){
    console.log(this.urlService.currentTask)
    this.subtaskValue = subtask.name;
  }

  deleteSubtask(){}


  closeSubtask(){
    this.urlService.showTaskBoolean = false
  }
}
