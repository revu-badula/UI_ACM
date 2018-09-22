import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAssessRecomendComponent } from './system-assess-recomend.component';

describe('SystemAssessRecomendComponent', () => {
  let component: SystemAssessRecomendComponent;
  let fixture: ComponentFixture<SystemAssessRecomendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemAssessRecomendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemAssessRecomendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
