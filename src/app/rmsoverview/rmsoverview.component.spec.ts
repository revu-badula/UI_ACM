import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmsoverviewComponent } from './rmsoverview.component';

describe('RmsoverviewComponent', () => {
  let component: RmsoverviewComponent;
  let fixture: ComponentFixture<RmsoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmsoverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmsoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
