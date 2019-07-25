import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewitpmComponent } from './newitpm.component';

describe('NewitpmComponent', () => {
  let component: NewitpmComponent;
  let fixture: ComponentFixture<NewitpmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewitpmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewitpmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
