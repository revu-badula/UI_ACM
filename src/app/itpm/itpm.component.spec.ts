import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ITPMComponent } from './itpm.component';

describe('ITPMComponent', () => {
  let component: ITPMComponent;
  let fixture: ComponentFixture<ITPMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ITPMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ITPMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
