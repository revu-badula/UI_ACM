import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemauditlandingComponent } from './systemauditlanding.component';

describe('SystemauditlandingComponent', () => {
  let component: SystemauditlandingComponent;
  let fixture: ComponentFixture<SystemauditlandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemauditlandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemauditlandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
