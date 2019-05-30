import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentclassificationComponent } from './incidentclassification.component';

describe('IncidentclassificationComponent', () => {
  let component: IncidentclassificationComponent;
  let fixture: ComponentFixture<IncidentclassificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentclassificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentclassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
