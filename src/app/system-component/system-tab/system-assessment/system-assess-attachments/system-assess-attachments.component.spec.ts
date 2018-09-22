import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAssessAttachmentsComponent } from './system-assess-attachments.component';

describe('SystemAssessAttachmentsComponent', () => {
  let component: SystemAssessAttachmentsComponent;
  let fixture: ComponentFixture<SystemAssessAttachmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemAssessAttachmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemAssessAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
