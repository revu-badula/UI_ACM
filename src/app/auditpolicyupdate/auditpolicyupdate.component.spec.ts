import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditpolicyupdateComponent } from './auditpolicyupdate.component';

describe('AuditpolicyupdateComponent', () => {
  let component: AuditpolicyupdateComponent;
  let fixture: ComponentFixture<AuditpolicyupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditpolicyupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditpolicyupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
