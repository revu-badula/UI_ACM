import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemrmflandingComponent } from './systemrmflanding.component';

describe('SystemrmflandingComponent', () => {
  let component: SystemrmflandingComponent;
  let fixture: ComponentFixture<SystemrmflandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemrmflandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemrmflandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
