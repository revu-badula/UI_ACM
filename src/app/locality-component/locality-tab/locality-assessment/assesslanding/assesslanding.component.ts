import { Component, OnInit,ViewChild,TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-assesslanding',
  templateUrl: './assesslanding.component.html',
  styleUrls: ['./assesslanding.component.css']
})
export class AssesslandingComponent implements OnInit {

  @ViewChild('content') content: TemplateRef<any>;
  constructor(private router:Router, private modalService: NgbModal) { }

  ngOnInit() {
  }
  goToAudit() {
    this.router.navigate(['/locality/tab/assessment/assessmentOverview']);
  }

  createYourQuestion(){
    this.router.navigate(['/createYourQuestion']);
  }

  sampleQuestion(){
    this.router.navigate(['/sampleQuestion']);
  }

  Show()
  {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(this.content,ngbModalOptions);

  }

}
