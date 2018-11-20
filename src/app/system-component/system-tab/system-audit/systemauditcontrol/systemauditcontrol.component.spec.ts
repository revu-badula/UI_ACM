import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemauditcontrolComponent } from './systemauditcontrol.component';

describe('SystemauditcontrolComponent', () => {
  let component: SystemauditcontrolComponent;
  let fixture: ComponentFixture<SystemauditcontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemauditcontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemauditcontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
