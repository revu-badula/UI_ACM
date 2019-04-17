import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceentryComponent } from './deviceentry.component';

describe('DeviceentryComponent', () => {
  let component: DeviceentryComponent;
  let fixture: ComponentFixture<DeviceentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
