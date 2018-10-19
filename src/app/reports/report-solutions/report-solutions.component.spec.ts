import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSolutionsComponent } from './report-solutions.component';

describe('ReportSolutionsComponent', () => {
  let component: ReportSolutionsComponent;
  let fixture: ComponentFixture<ReportSolutionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSolutionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
