import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemrmfComponent } from './systemrmf.component';

describe('SystemrmfComponent', () => {
  let component: SystemrmfComponent;
  let fixture: ComponentFixture<SystemrmfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemrmfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemrmfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
