import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLegalComponent } from './report-legal.component';

describe('ReportLegalComponent', () => {
  let component: ReportLegalComponent;
  let fixture: ComponentFixture<ReportLegalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportLegalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
