import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentpolicyupdateComponent } from './assessmentpolicyupdate.component';

describe('AssessmentpolicyupdateComponent', () => {
  let component: AssessmentpolicyupdateComponent;
  let fixture: ComponentFixture<AssessmentpolicyupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentpolicyupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentpolicyupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
