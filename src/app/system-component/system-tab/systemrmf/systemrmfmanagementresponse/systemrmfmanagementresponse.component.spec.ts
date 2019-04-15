import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemrmfmanagementresponseComponent } from './systemrmfmanagementresponse.component';

describe('SystemrmfmanagementresponseComponent', () => {
  let component: SystemrmfmanagementresponseComponent;
  let fixture: ComponentFixture<SystemrmfmanagementresponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemrmfmanagementresponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemrmfmanagementresponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
