import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAssessManagementComponent } from './system-assess-management.component';

describe('SystemAssessManagementComponent', () => {
  let component: SystemAssessManagementComponent;
  let fixture: ComponentFixture<SystemAssessManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemAssessManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemAssessManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
