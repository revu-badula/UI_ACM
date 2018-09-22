import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAssessSecurityComponent } from './system-assess-security.component';

describe('SystemAssessSecurityComponent', () => {
  let component: SystemAssessSecurityComponent;
  let fixture: ComponentFixture<SystemAssessSecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemAssessSecurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemAssessSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
