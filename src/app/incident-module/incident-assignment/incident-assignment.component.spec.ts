import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentAssignmentComponent } from './incident-assignment.component';

describe('IncidentAssignmentComponent', () => {
  let component: IncidentAssignmentComponent;
  let fixture: ComponentFixture<IncidentAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
