import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemrmftaskComponent } from './systemrmftask.component';

describe('SystemrmftaskComponent', () => {
  let component: SystemrmftaskComponent;
  let fixture: ComponentFixture<SystemrmftaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemrmftaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemrmftaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
