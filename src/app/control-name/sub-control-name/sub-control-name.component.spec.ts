import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubControlNameComponent } from './sub-control-name.component';

describe('SubControlNameComponent', () => {
  let component: SubControlNameComponent;
  let fixture: ComponentFixture<SubControlNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubControlNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubControlNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
