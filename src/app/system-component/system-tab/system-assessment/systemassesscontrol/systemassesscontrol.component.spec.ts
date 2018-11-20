import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemassesscontrolComponent } from './systemassesscontrol.component';

describe('SystemassesscontrolComponent', () => {
  let component: SystemassesscontrolComponent;
  let fixture: ComponentFixture<SystemassesscontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemassesscontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemassesscontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
