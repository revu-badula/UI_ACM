import { Component, OnInit,TemplateRef,ViewChild } from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('content') content: TemplateRef<any>;
  constructor(private modalService: NgbModal,private router: Router) { 
    localStorage.removeItem('localityName');
    localStorage.removeItem('appAuditId');
    localStorage.removeItem('appMouId');
    localStorage.removeItem('auditActive');
    localStorage.removeItem('active');
    localStorage.removeItem('systemName');
    localStorage.removeItem('systemActive');
  }

  ngOnInit() {
  }
  
  open(content) {
   this.modalService.open(content);

  }
  showLocal(){
  this.router.navigate(['/locality/map']);
  }
  
  showSys(){
  this.router.navigate(['/system/map']);
    }

}
