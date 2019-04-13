import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemrmffirstComponent } from './systemrmffirst.component';

describe('SystemrmffirstComponent', () => {
  let component: SystemrmffirstComponent;
  let fixture: ComponentFixture<SystemrmffirstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemrmffirstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemrmffirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
