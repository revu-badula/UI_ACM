import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemrmfbudgetComponent } from './systemrmfbudget.component';

describe('SystemrmfbudgetComponent', () => {
  let component: SystemrmfbudgetComponent;
  let fixture: ComponentFixture<SystemrmfbudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemrmfbudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemrmfbudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
