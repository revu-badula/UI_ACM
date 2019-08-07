import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyDummyComponent } from './policy-dummy.component';

describe('PolicyDummyComponent', () => {
  let component: PolicyDummyComponent;
  let fixture: ComponentFixture<PolicyDummyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyDummyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyDummyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
