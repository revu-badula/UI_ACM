import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicysidebarComponent } from './policysidebar.component';

describe('PolicysidebarComponent', () => {
  let component: PolicysidebarComponent;
  let fixture: ComponentFixture<PolicysidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicysidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicysidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
