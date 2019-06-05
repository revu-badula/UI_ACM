import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentstartComponent } from './incidentstart.component';

describe('IncidentstartComponent', () => {
  let component: IncidentstartComponent;
  let fixture: ComponentFixture<IncidentstartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentstartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentstartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
