import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyParentComponent } from './policy-parent.component';

describe('PolicyParentComponent', () => {
  let component: PolicyParentComponent;
  let fixture: ComponentFixture<PolicyParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
