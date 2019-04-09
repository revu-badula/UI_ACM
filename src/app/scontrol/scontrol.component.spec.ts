import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScontrolComponent } from './scontrol.component';

describe('ScontrolComponent', () => {
  let component: ScontrolComponent;
  let fixture: ComponentFixture<ScontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
