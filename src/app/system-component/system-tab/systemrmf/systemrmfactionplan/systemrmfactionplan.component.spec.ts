import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemrmfactionplanComponent } from './systemrmfactionplan.component';

describe('SystemrmfactionplanComponent', () => {
  let component: SystemrmfactionplanComponent;
  let fixture: ComponentFixture<SystemrmfactionplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemrmfactionplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemrmfactionplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
