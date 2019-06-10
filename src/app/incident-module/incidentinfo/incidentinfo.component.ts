import { Component, OnInit, HostListener, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Observable, from, Subscription, timer } from 'rxjs';
import { DialogService } from '../../dialog.service';
import { NavigationComponentComponent } from '../../navigation-component/navigation-component.component';
import { IdleTimeoutService } from '../../idleTimeOutService';
import { Router } from '@angular/router';
import { AlertService } from '../../alert.service';
import { MissionService } from '../incident-service';


@Component({
  selector: 'app-incidentinfo',
  templateUrl: './incidentinfo.component.html',
  styleUrls: ['./incidentinfo.component.css'],
  providers: [NavigationComponentComponent]
})
export class IncidentinfoComponent implements OnInit {

  private _timerSubscription: Subscription;
  private _idleTimerSubscription: Subscription;
  public _counter: number = 0;
  private _timer: Observable<number>;
  private subscription: Subscription;
  private subscription1: Subscription;
  @Input() comingType: boolean;
  public message: any;
  public showText: boolean = false;
  public showBIA: boolean;
  public test:any;
  constructor(private _location: Location, private idleTimeoutSvc: IdleTimeoutService, private dialogService: DialogService,
    private navbar: NavigationComponentComponent,
    private router: Router, private alertService: AlertService, private missionService: MissionService) { }

  ngOnInit() {

    this.subscription = this.alertService.getChildData().subscribe(message => {
      this.message = message;
      if (this.message !== undefined) {
        if (this.message.text === "true") {
          this.showText = true;
        }
        else if (this.message.text === 'false') {
          this.showText = false;
        }
      }
    });

    this.subscription1 = this.missionService.missionAnnounced$.subscribe(
      mission => {
        this.test=mission;
      });

    this.startCounter();
    //this.idleTimeoutSvc.setTimeMilli(900000);
    this._idleTimerSubscription = this.idleTimeoutSvc.timeoutExpired.subscribe(res => {
      this.navbar.signOut();
      var modalPromise = this.dialogService.open("Info", "Your session has been timedout.", false, "OK", "Ok");
      var newObservable = from(modalPromise);
      newObservable.subscribe(
        (res) => {
          if (res === true) {
            this.router.navigate(['']);
          }
        },
        (reason: any) => {

        }
      );
    });
    if (this.comingType !== undefined) {
      this.showBIA = this.comingType;
    }
  }

  backClicked() {
    this._location.back();
  }

  public startCounter() {
    if (this._timerSubscription) {
      this._timerSubscription.unsubscribe();
    }
    this._counter = 0;
    this._timer = timer(1000, 1000);
    this._timerSubscription = this._timer.subscribe(n => {
      this._counter++;
    });
  }

  @HostListener('document:keyup', ['$event'])
  @HostListener('document:click', ['$event'])
  @HostListener('document:wheel', ['$event'])
  @HostListener('document:mouseover', ['$event'])
  @HostListener('document:mouseout', ['$event'])
  getData() {
    this.idleTimeoutSvc.resetTimer();
    this.startCounter();
  }
  ngOnDestroy() {
    this._idleTimerSubscription.unsubscribe();
    this.subscription.unsubscribe();
    this.subscription1.unsubscribe();
  }

}
