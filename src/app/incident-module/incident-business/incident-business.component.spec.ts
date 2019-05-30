import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentBusinessComponent } from './incident-business.component';

describe('IncidentBusinessComponent', () => {
  let component: IncidentBusinessComponent;
  let fixture: ComponentFixture<IncidentBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
