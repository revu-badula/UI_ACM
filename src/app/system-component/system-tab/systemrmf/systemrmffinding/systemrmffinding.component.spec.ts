import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemrmffindingComponent } from './systemrmffinding.component';

describe('SystemrmffindingComponent', () => {
  let component: SystemrmffindingComponent;
  let fixture: ComponentFixture<SystemrmffindingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemrmffindingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemrmffindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
