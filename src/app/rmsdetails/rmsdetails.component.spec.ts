import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmsdetailsComponent } from './rmsdetails.component';

describe('RmsdetailsComponent', () => {
  let component: RmsdetailsComponent;
  let fixture: ComponentFixture<RmsdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmsdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
