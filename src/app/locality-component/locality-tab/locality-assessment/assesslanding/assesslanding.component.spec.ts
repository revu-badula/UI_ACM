import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssesslandingComponent } from './assesslanding.component';

describe('AssesslandingComponent', () => {
  let component: AssesslandingComponent;
  let fixture: ComponentFixture<AssesslandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssesslandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssesslandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
