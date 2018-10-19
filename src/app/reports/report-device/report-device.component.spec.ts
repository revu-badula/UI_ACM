import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDeviceComponent } from './report-device.component';

describe('ReportDeviceComponent', () => {
  let component: ReportDeviceComponent;
  let fixture: ComponentFixture<ReportDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
