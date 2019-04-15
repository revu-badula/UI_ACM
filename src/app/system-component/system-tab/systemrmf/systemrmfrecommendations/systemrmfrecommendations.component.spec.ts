import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemrmfrecommendationsComponent } from './systemrmfrecommendations.component';

describe('SystemrmfrecommendationsComponent', () => {
  let component: SystemrmfrecommendationsComponent;
  let fixture: ComponentFixture<SystemrmfrecommendationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemrmfrecommendationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemrmfrecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
