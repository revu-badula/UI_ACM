import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';
import { Cookie } from 'ng2-cookies';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('content') content: TemplateRef<any>;
  @ViewChild('content1') content1: TemplateRef<any>;

  constructor(private modalService: NgbModal, private router: Router) {
    localStorage.removeItem('localityName');
    localStorage.removeItem('appAuditId');
    localStorage.removeItem('appMouId');
    localStorage.removeItem('auditActive');
    localStorage.removeItem('active');
    localStorage.removeItem('systemName');
    localStorage.removeItem('systemActive');
  }

  ngOnInit() {
    // this.userIdle.startWatching();

    // this.userIdle.onTimerStart().subscribe(count => {
    //   //  console.log(count)
    // });
    // this.userIdle.onTimeout().subscribe(() => {
    //   let ngbModalOptions: NgbModalOptions = {
    //     backdrop: 'static',
    //     keyboard: false
    //   };
    //   this.modalService.open(this.content1, ngbModalOptions);
    //   this.userIdle.stopWatching();
    //   Cookie.delete('access_token');
    // });
  }

  open(content) {
    this.modalService.open(content);

  }
  showLocal() {
    this.router.navigate(['/locality/map']);
  }

  showSys() {
    this.router.navigate(['/system/map']);
  }

  ngOnDestroy()
  {
    //this.userIdle.stopWatching();
  }

  deleteCookie()
  {
    this.router.navigate(['/login']);
  }

}
