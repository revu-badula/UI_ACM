import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditLandingComponent } from './audit-landing.component';

describe('AuditLandingComponent', () => {
  let component: AuditLandingComponent;
  let fixture: ComponentFixture<AuditLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
