import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyreviewViewComponent } from './policyreview-view.component';

describe('PolicyreviewViewComponent', () => {
  let component: PolicyreviewViewComponent;
  let fixture: ComponentFixture<PolicyreviewViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyreviewViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyreviewViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
