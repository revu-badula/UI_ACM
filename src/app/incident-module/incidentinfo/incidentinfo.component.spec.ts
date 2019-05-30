import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentinfoComponent } from './incidentinfo.component';

describe('IncidentinfoComponent', () => {
  let component: IncidentinfoComponent;
  let fixture: ComponentFixture<IncidentinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
