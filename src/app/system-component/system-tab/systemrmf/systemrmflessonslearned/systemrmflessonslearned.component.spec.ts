import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemrmflessonslearnedComponent } from './systemrmflessonslearned.component';

describe('SystemrmflessonslearnedComponent', () => {
  let component: SystemrmflessonslearnedComponent;
  let fixture: ComponentFixture<SystemrmflessonslearnedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemrmflessonslearnedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemrmflessonslearnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
