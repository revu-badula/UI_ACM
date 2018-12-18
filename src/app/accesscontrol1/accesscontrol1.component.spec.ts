import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Accesscontrol1Component } from './accesscontrol1.component';

describe('Accesscontrol1Component', () => {
  let component: Accesscontrol1Component;
  let fixture: ComponentFixture<Accesscontrol1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Accesscontrol1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Accesscontrol1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
