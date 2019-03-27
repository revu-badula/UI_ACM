import { Component, OnInit,ViewChild,TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-systemassesslanding',
  templateUrl: './systemassesslanding.component.html',
  styleUrls: ['./systemassesslanding.component.css']
})
export class SystemassesslandingComponent implements OnInit {

  @ViewChild('content') content: TemplateRef<any>;
  constructor(private router:Router, private modalService: NgbModal) { }

  ngOnInit() {
  }
  goToAudit() {
    this.router.navigate(['/system/tab2/assessment/sysassessoverview']);
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
