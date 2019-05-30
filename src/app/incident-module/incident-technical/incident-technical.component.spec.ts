import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentTechnicalComponent } from './incident-technical.component';

describe('IncidentTechnicalComponent', () => {
  let component: IncidentTechnicalComponent;
  let fixture: ComponentFixture<IncidentTechnicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentTechnicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentTechnicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
