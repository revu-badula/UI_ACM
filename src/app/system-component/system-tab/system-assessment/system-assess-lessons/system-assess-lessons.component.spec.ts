import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAssessLessonsComponent } from './system-assess-lessons.component';

describe('SystemAssessLessonsComponent', () => {
  let component: SystemAssessLessonsComponent;
  let fixture: ComponentFixture<SystemAssessLessonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemAssessLessonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemAssessLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
