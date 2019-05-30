import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentcapComponent } from './incidentcap.component';

describe('IncidentcapComponent', () => {
  let component: IncidentcapComponent;
  let fixture: ComponentFixture<IncidentcapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentcapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentcapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
