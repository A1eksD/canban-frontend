import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTodosComponent } from './show-todos.component';

describe('ShowTodosComponent', () => {
  let component: ShowTodosComponent;
  let fixture: ComponentFixture<ShowTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowTodosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
