import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentdetailComponent } from './incidentdetail.component';

describe('IncidentdetailComponent', () => {
  let component: IncidentdetailComponent;
  let fixture: ComponentFixture<IncidentdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
