import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentImpactComponent } from './incident-impact.component';

describe('IncidentImpactComponent', () => {
  let component: IncidentImpactComponent;
  let fixture: ComponentFixture<IncidentImpactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentImpactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentImpactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
