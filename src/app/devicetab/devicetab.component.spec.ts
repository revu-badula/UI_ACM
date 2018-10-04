import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicetabComponent } from './devicetab.component';

describe('DevicetabComponent', () => {
  let component: DevicetabComponent;
  let fixture: ComponentFixture<DevicetabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicetabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicetabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
