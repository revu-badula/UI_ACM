import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessControlComponent } from './assess-control.component';

describe('AssessControlComponent', () => {
  let component: AssessControlComponent;
  let fixture: ComponentFixture<AssessControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
