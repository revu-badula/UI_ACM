import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingAuditComponent } from './upcoming-audit.component';

describe('UpcomingAuditComponent', () => {
  let component: UpcomingAuditComponent;
  let fixture: ComponentFixture<UpcomingAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
