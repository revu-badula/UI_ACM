import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAssessFindComponent } from './system-assess-find.component';

describe('SystemAssessFindComponent', () => {
  let component: SystemAssessFindComponent;
  let fixture: ComponentFixture<SystemAssessFindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemAssessFindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemAssessFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
