import {
  Component, OnInit, TemplateRef, ViewChild, OnDestroy, ChangeDetectorRef,
  ChangeDetectionStrategy, Renderer2
} from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';
import { Cookie } from 'ng2-cookies';
import { Observable, Subject, BehaviorSubject, Subscription } from 'rxjs';
import { IdleTimeoutService } from '../idleTimeOutService';
import { DialogService } from '../dialog.service';
import { UtilService } from '../util.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('content') content: TemplateRef<any>;
  @ViewChild('content1') content1: TemplateRef<any>;
 
  constructor(private modalService: NgbModal, private router: Router,
    private changeRef: ChangeDetectorRef, private idleTimeoutSvc: IdleTimeoutService,
    private dialogSvc: DialogService, private renderer: Renderer2, private utilService: UtilService) {
    UtilService.backClicked = false;
   
    // sessionStorage.removeItem('active');
    // sessionStorage.removeItem('systemName');
    // sessionStorage.removeItem('systemActive');
    
  }

  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    
  }

  open(content:any) {
    this.modalService.open(content);

  }
  showLocal() {
    this.router.navigate(['/locality/map']);
  }

  showSys() {
    this.router.navigate(['/system/map']);
  }

  
  ngOnDestroy() {
    //this._idleTimerSubscription.unsubscribe(); 
  }

  deleteCookie() {
    Cookie.delete('access_token');
    this.router.navigate(['/login']);
  }

}
