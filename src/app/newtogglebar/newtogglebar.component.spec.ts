import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewtogglebarComponent } from './newtogglebar.component';

describe('NewtogglebarComponent', () => {
  let component: NewtogglebarComponent;
  let fixture: ComponentFixture<NewtogglebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewtogglebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewtogglebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
