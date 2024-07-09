import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UrlService } from '../../../service/urls-service.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-show-card-details',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './show-card-details.component.html',
  styleUrl: './show-card-details.component.scss',
})
export class ShowCardDetailsComponent implements OnInit{
  subtaskValue: string = '';
  showEditWindow: boolean = false;
  currentSubtask: any = '';
  deleteValue = false;

  constructor(public urlService: UrlService) {}

  ngOnInit() {
    this.urlService.startFetchData().then(jsonData => {
        this.urlService.userNames = jsonData;
    });
}
  editSubtask(subtask: any, event: Event) {
    event.stopPropagation();
    this.showEditWindow = !this.showEditWindow;
    this.subtaskValue = subtask.name;
    this.currentSubtask = subtask;
  }

  deleteSubtask(event: Event) {
    event.stopPropagation();
    this.deleteValue = false;

    this.urlService
      .deleteSubtask(this.urlService.currentTask.id)
      .pipe(
        catchError((error) => {
          console.log('permission error', error);
          this.deleteValue = true;
          return throwError(error);
        })
      )
      .subscribe(() => {
        this.urlService.showTaskBoolean = false;
        location.reload();
      });
  }

  closeSubtask(event: Event) {
    event.stopPropagation();
    this.urlService.showTaskBoolean = false;
  }

  saveEditSubtask(event: Event) {
    event.stopPropagation();
    this.showEditWindow = !this.showEditWindow;
    this.urlService.updateSubtaskValue(this.currentSubtask, this.subtaskValue);
  }

  editSubtaskInout(event: Event) {
    event.stopPropagation();
  }

  showUserName(item: number) {
    let userName = this.urlService.userNames.find(
      (user: any) => user.id === item
    );
    if (userName) {
      return userName.username;
    }
  }

  stopEvent(event: Event){
    event.stopPropagation();
  }
}
