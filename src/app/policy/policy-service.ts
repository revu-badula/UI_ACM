import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
@Injectable()
export class policyService {
    private policySubject = new Subject<any>();
    policyState = this.policySubject.asObservable();
    constructor() { }
    show() {
        this.policySubject.next({ show: true });
    }
    hide() {
        this.policySubject.next({ show: false });
    }
}