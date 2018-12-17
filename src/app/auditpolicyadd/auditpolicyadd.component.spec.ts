import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditpolicyaddComponent } from './auditpolicyadd.component';

describe('AuditpolicyaddComponent', () => {
  let component: AuditpolicyaddComponent;
  let fixture: ComponentFixture<AuditpolicyaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditpolicyaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditpolicyaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
