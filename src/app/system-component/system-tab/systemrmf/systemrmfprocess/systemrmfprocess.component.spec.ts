import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemrmfprocessComponent } from './systemrmfprocess.component';

describe('SystemrmfprocessComponent', () => {
  let component: SystemrmfprocessComponent;
  let fixture: ComponentFixture<SystemrmfprocessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemrmfprocessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemrmfprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
