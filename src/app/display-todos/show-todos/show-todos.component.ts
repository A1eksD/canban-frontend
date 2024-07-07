import { Component } from '@angular/core';
import { UrlService } from '../../service/urls-service.service';
import { FormsModule } from '@angular/forms';
import { OnDragHighlightDirective } from '../../directives/on-drag-highlight.directive';
import { CommonModule } from '@angular/common';
import { CardDetailsComponent } from './card-details/card-details.component';
import { Todo } from '../../interfece/todo';
import { ShowCardDetailsComponent } from './show-card-details/show-card-details.component';

@Component({
  selector: 'app-show-todos',
  standalone: true,
  imports: [CommonModule, OnDragHighlightDirective, FormsModule, CardDetailsComponent, ShowCardDetailsComponent],
  templateUrl: './show-todos.component.html',
  styleUrl: './show-todos.component.scss'
})
export class ShowTodosComponent {

  currentDraggedElement: number = 0;
  filterTaskValue: string = '';
  toDoCategory: any[] = [];
  inProgressCategory: any[] = [];
  awaitFeedbackCategory: any[] = [];
  doneCategory: any[] = [];
  currentCategory: string = 'open';
  openAddNewTaskWindow: boolean = false;
  CategorY: string= '';
  filteredTasks: any[] = [];


  constructor(public UrlService: UrlService){}

  ngOnInit() {
    this.UrlService.fetchTasks().subscribe(tasks => {
      this.UrlService.allTasks = tasks;
      this.getToDOCategory();
      this.getInProgressCategory();
      this.getAwaitFeedbackCategory();
      this.getDoneategory();
    });
  }

  getToDOCategory() {
    this.toDoCategory = this.UrlService.allTasks.filter((t) => t.category === "todo");
    if (this.toDoCategory.length > 0) {
      return true;
    }
    return false;
  }

  getInProgressCategory() {
    this.inProgressCategory = this.UrlService.allTasks.filter((t) => t.category === "inProgress");
    if (this.inProgressCategory.length > 0) {
      return true;
    }
    return false;
  }

  getAwaitFeedbackCategory() {
    this.awaitFeedbackCategory = this.UrlService.allTasks.filter((t) => t.category === "awaitFeedback");
    if (this.awaitFeedbackCategory.length > 0) {
      return true;
    }
    return false;
  }

  getDoneategory() {
    this.doneCategory = this.UrlService.allTasks.filter((t) => t.category === "done");
    if (this.doneCategory.length > 0) {
      return true;
    }
    return false;
  }

  startDragging(id: string) {
    this.currentDraggedElement = +id; 
  }

  allowDrop(event: Event) {
    event.preventDefault();
  }

  moveTo(category: string) {
    const draggedIndex = this.currentDraggedElement;
    if (draggedIndex !== null) {
      const getCurrentTask = this.UrlService.allTasks.filter((t) => t.id === this.currentDraggedElement);
      getCurrentTask[0].category = category;
      try{
        this.UrlService.updateTaskCategors( getCurrentTask[0], getCurrentTask[0].id! ,category);
      } catch (e){
        console.log('Error at change category ', e);
      }
    }
  }

  highlight(category: string) {
    this.currentCategory = category;
    
  }
  
  removeHighlight(category: string) {
    this.currentCategory = category;
  }

  createNewTask(taskCategory: string){
    this.openAddNewTaskWindow = true;
    this.CategorY = taskCategory;
  }

  toggleBoolean(vlaue: boolean){
    this.openAddNewTaskWindow = vlaue;
  }


  updateCategoryLists(tasks : any) {
    this.toDoCategory = tasks.filter((task: any) => task.category === 'todo');
    this.inProgressCategory = tasks.filter((task: any) => task.category === 'inProgress');
    this.awaitFeedbackCategory = tasks.filter((task: any) => task.category === 'awaitFeedback');
    this.doneCategory = tasks.filter((task: any) => task.category === 'done');
  }


  getPrio(priority: number){
    if (priority === 1) {
      return "low";
    } else if (priority === 2) {
      return "medium";
    } else if (priority === 3) {
      return "high";
    }
    return '';
  }


  showTask(item: Todo){
    this.UrlService.showTaskBoolean = !this.UrlService.showTaskBoolean;
    this.UrlService.currentTask = item;
    this.UrlService.startFetchData();
  }

  closeTask(){
    this.UrlService.showTaskBoolean = !this.UrlService.showTaskBoolean;
  }
}
