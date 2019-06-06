import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentBusinessImpactComponent } from './incident-business-impact.component';

describe('IncidentBusinessImpactComponent', () => {
  let component: IncidentBusinessImpactComponent;
  let fixture: ComponentFixture<IncidentBusinessImpactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentBusinessImpactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentBusinessImpactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
