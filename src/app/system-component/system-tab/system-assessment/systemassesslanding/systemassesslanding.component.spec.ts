import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemassesslandingComponent } from './systemassesslanding.component';

describe('SystemassesslandingComponent', () => {
  let component: SystemassesslandingComponent;
  let fixture: ComponentFixture<SystemassesslandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemassesslandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemassesslandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
