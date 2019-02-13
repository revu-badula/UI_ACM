import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesscontroldetailsComponent } from './accesscontroldetails.component';

describe('AccesscontroldetailsComponent', () => {
  let component: AccesscontroldetailsComponent;
  let fixture: ComponentFixture<AccesscontroldetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccesscontroldetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesscontroldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
