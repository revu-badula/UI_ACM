import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
@Injectable()
export class DialogService {
  confirm(message?: string): Observable<boolean> {
    const confirmation = window.confirm(message);

    return Observable.of(confirmation);
  };
} 