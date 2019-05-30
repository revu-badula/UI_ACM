import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription, timer } from 'rxjs';

@Injectable()
export class IdleTimeoutService {
    private _count: number = 0;
    private _serviceId: string = 'idleTimeoutSvc-' + Math.floor(Math.random() * 10000);
    private _timeoutMilliseconds: number=900000;
    private timerSubscription: Subscription;
    private _timer: Observable<number>;
    private resetOnTrigger: boolean = false;
    private lastTime: number;
    private dateTimer: Observable<any>;
    private dateTimerSubscription: Subscription;
    private dateTimerInterval : number = 1000 * 60 * 5;
    private dateTimerTolerance: number = 1000 * 10;
    public timeoutExpired: Subject<number> = new Subject<number>();

    constructor() {
        this.timeoutExpired.subscribe(n => {
        });

        this.startTimer();
        this.startDateCompare();
    }

    setTimeMilli(value:any)
    {
        this._timeoutMilliseconds=value;
    }

    private setSubscription() {
        this._timer = timer(this._timeoutMilliseconds);
        this.timerSubscription = this._timer.subscribe(n => {
            this.timerComplete(n);
        });
    }

    private startDateCompare() {
        this.lastTime = (new Date()).getTime();
        this.dateTimer = timer(this.dateTimerInterval); // compare every five minutes
        this.dateTimerSubscription = this.dateTimer.subscribe(n => {
            let currentTime: number = (new Date()).getTime();
            if (currentTime > (this.lastTime + this.dateTimerInterval + this.dateTimerTolerance)) { // look for 10 sec diff
              
            }
            else {
                
            }
            this.dateTimerSubscription.unsubscribe();
            this.startDateCompare();
        });
    }

    public startTimer() {
        if (this.timerSubscription) {
            this.stopTimer();
        }
        
        this.setSubscription();
    }

    public stopTimer() {
        this.timerSubscription.unsubscribe();
    }

    public resetTimer() {
        this.startTimer();
    }

    private timerComplete(n: number) {
        this.timeoutExpired.next(++this._count);

        if (this.resetOnTrigger) {
            this.startTimer();
        }
    }
}
