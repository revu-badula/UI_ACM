import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemrmfsecurityriskComponent } from './systemrmfsecurityrisk.component';

describe('SystemrmfsecurityriskComponent', () => {
  let component: SystemrmfsecurityriskComponent;
  let fixture: ComponentFixture<SystemrmfsecurityriskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemrmfsecurityriskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemrmfsecurityriskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
