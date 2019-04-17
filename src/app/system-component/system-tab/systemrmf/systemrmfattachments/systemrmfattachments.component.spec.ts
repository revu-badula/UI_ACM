import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemrmfattachmentsComponent } from './systemrmfattachments.component';

describe('SystemrmfattachmentsComponent', () => {
  let component: SystemrmfattachmentsComponent;
  let fixture: ComponentFixture<SystemrmfattachmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemrmfattachmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemrmfattachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
