import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBusinessImpactComponetComponent } from './new-business-impact-componet.component';

describe('NewBusinessImpactComponetComponent', () => {
  let component: NewBusinessImpactComponetComponent;
  let fixture: ComponentFixture<NewBusinessImpactComponetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBusinessImpactComponetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBusinessImpactComponetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
