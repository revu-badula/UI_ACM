import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAssessActionComponent } from './system-assess-action.component';

describe('SystemAssessActionComponent', () => {
  let component: SystemAssessActionComponent;
  let fixture: ComponentFixture<SystemAssessActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemAssessActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemAssessActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
