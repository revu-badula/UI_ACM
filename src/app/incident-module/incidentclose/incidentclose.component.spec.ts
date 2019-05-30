import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentcloseComponent } from './incidentclose.component';

describe('IncidentcloseComponent', () => {
  let component: IncidentcloseComponent;
  let fixture: ComponentFixture<IncidentcloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentcloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentcloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
