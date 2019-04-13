import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemrmfprepareComponent } from './systemrmfprepare.component';

describe('SystemrmfprepareComponent', () => {
  let component: SystemrmfprepareComponent;
  let fixture: ComponentFixture<SystemrmfprepareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemrmfprepareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemrmfprepareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
