import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentpolicyaddComponent } from './assessmentpolicyadd.component';

describe('AssessmentpolicyaddComponent', () => {
  let component: AssessmentpolicyaddComponent;
  let fixture: ComponentFixture<AssessmentpolicyaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentpolicyaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentpolicyaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
