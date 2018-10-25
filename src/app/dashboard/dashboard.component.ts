import { Component, OnInit, TemplateRef, ViewChild, OnDestroy, ChangeDetectorRef, 
  ChangeDetectionStrategy, Renderer2 } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';
import { Cookie } from 'ng2-cookies';
import { Observable, Subject, BehaviorSubject, Subscription} from 'rxjs';
import { IdleTimeoutService } from '../idleTimeOutService';
import { DialogService } from '../dialog.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('content') content: TemplateRef<any>;
  @ViewChild('content1') content1: TemplateRef<any>;
  // public _counter: number = 0;
  // public _status: string = "Initialized.";
  // private _timer: Observable<number>;
  // private _timerSubscription: Subscription;
  // private _idleTimerSubscription: Subscription;
  constructor(private modalService: NgbModal, private router: Router,
     private changeRef: ChangeDetectorRef, private idleTimeoutSvc: IdleTimeoutService, 
     private dialogSvc: DialogService, private renderer: Renderer2) {
    localStorage.removeItem('localityName');
    localStorage.removeItem('appAuditId');
    localStorage.removeItem('appMouId');
    localStorage.removeItem('auditActive');
    localStorage.removeItem('active');
    localStorage.removeItem('systemName');
    localStorage.removeItem('systemActive');
    //this.renderer.setStyle(document.body, 'background-color', 'yellow');
  }

  ngOnInit() {
    // this._idleTimerSubscription = this.idleTimeoutSvc.timeoutExpired.subscribe(res => {
    //   var modalPromise = this.dialogSvc.open("Session Expiring!", "Your session is about to expire. Do you need more time?", true, "Yes", "No");
    //   var newObservable = Observable.fromPromise(modalPromise);
    //   newObservable.subscribe(
    //       (res) => {
    //           if (res === true) {
                  
    //               // this.idleTimeoutSvc.resetTimer();
    //               // this.startCounter();
    //               //this.changeRef.markForCheck();
    //               this.deleteCookie();
                  
    //           } else {
                 
    //               //this.changeRef.markForCheck();
    //               this.deleteCookie();
    //           }
    //       },
    //       (reason) => {
    //           this.changeRef.markForCheck();
    //       }
    //   );
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

  // public startCounter() {
  //   if (this._timerSubscription) {
  //       this._timerSubscription.unsubscribe();
  //   }

  //   this._counter = 0;
  //   this._timer = Observable.timer(1000, 1000);
  //   this._timerSubscription = this._timer.subscribe(n => {
  //       this._counter++;
  //       this.changeRef.markForCheck();
  //   });
  // }
  
  // public reset() {
  //   this.startCounter();
  //   this._status = "Initialized.";
  //   this.idleTimeoutSvc.resetTimer();
  // }

  ngOnDestroy()
  {
     //this._idleTimerSubscription.unsubscribe(); 
  }

  deleteCookie()
  {
    Cookie.delete('access_token');
    this.router.navigate(['/login']);
  }

}
