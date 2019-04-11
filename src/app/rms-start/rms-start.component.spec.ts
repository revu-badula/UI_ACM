import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmsStartComponent } from './rms-start.component';

describe('RmsStartComponent', () => {
  let component: RmsStartComponent;
  let fixture: ComponentFixture<RmsStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmsStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmsStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
