import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportlegalsystemComponent } from './reportlegalsystem.component';

describe('ReportlegalsystemComponent', () => {
  let component: ReportlegalsystemComponent;
  let fixture: ComponentFixture<ReportlegalsystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportlegalsystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportlegalsystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
