import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAssessBudgetComponent } from './system-assess-budget.component';

describe('SystemAssessBudgetComponent', () => {
  let component: SystemAssessBudgetComponent;
  let fixture: ComponentFixture<SystemAssessBudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemAssessBudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemAssessBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
