import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/Rx';
import { APP_CONFIG } from './app.config';
@Injectable()
export class UtilService{
static localityName:string;
static systemName:string;
static policyGrpId: number;
static auditId: number;
static showTab:boolean;
static sysId:number;
static venId:number;
static soluId:number;
static preId:number;
static disabled: boolean = true;
static popModal:boolean = false;
static active:boolean;
static review:boolean=false;
static loginstate:boolean = false;
static onEdit:boolean=false;
static auditActive:boolean;
public isLocalitySolutionAdd: boolean = false;
static backClicked: boolean = false;
static appAuditId:any;
static appMouId:any;
static signlegal:boolean=false;
static signsystem:boolean=false;
static pass:boolean=false;
static pending:boolean=false;
static calback:boolean=false;
public subject = new BehaviorSubject<any>(false);
public subject1 = new BehaviorSubject<any>(false);
setEditTrue(val : boolean) {
    this.subject.next(val);
  }
  getEdit() : Observable<any> {
    return this.subject.asObservable();
  }

  setSave(val : boolean){
    this.subject1.next(val);
  }

  getSave(): Observable<any> {
    return this.subject1.asObservable();
  }

  getFile(id)
  {
    window.open(APP_CONFIG.getFile + '?' + 'fileId' + '=' + id)
  }


}