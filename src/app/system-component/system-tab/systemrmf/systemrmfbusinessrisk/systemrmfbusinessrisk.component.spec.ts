import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemrmfbusinessriskComponent } from './systemrmfbusinessrisk.component';

describe('SystemrmfbusinessriskComponent', () => {
  let component: SystemrmfbusinessriskComponent;
  let fixture: ComponentFixture<SystemrmfbusinessriskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemrmfbusinessriskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemrmfbusinessriskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
