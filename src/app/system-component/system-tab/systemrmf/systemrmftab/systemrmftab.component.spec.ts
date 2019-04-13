import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemrmftabComponent } from './systemrmftab.component';

describe('SystemrmftabComponent', () => {
  let component: SystemrmftabComponent;
  let fixture: ComponentFixture<SystemrmftabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemrmftabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemrmftabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
