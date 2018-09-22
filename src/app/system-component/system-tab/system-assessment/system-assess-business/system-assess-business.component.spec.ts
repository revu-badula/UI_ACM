import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAssessBusinessComponent } from './system-assess-business.component';

describe('SystemAssessBusinessComponent', () => {
  let component: SystemAssessBusinessComponent;
  let fixture: ComponentFixture<SystemAssessBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemAssessBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemAssessBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
