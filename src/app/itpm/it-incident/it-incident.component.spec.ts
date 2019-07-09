import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItIncidentComponent } from './it-incident.component';

describe('ItIncidentComponent', () => {
  let component: ItIncidentComponent;
  let fixture: ComponentFixture<ItIncidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItIncidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
