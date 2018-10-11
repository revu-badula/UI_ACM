import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { APP_CONFIG } from '../../../../app.config';
import { UtilService } from '../../../../util.service';
import { ApiserviceService } from '../../../../apiservice.service';
import { AppAudit } from '../../../../data.model.auditDTO';
import { IMyDate, IMyDpOptions } from 'mydatepicker';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { FormsModule, NgForm, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
declare var swal: any; ''
import { Cookie } from 'ng2-cookies';
import { DialogService } from '../../../../dialog.service';
@Component({
  selector: 'app-audit-action',
  templateUrl: './audit-action.component.html',
  styleUrls: ['./audit-action.component.css']
})
export class AuditActionComponent implements OnInit {
  @ViewChild('content') content: TemplateRef<any>;
  @ViewChild('myForm') myForm: FormGroup;

  appAudit: AppAudit;
  public appAuditDTOs: any;
  public editData: any;
  public startDate: any;
  public endDate: any;
  public info: string = "";
  public loading: boolean = false;
  public showEdit: boolean = false;
  myDatePickerOptions: IMyDpOptions = {
    disableUntil: { year: 0, month: 0, day: 0 },
    showTodayBtn: false

  };
  public showForm: boolean = true;

  constructor(private _apiservice: ApiserviceService,
    private utilService: UtilService, private http: Http,
    private router: Router, private route: ActivatedRoute, private modalService: NgbModal,
     private datepipe: DatePipe, private dialogService: DialogService) {

    this.appAudit = new AppAudit();
    this.getAppId();
  }

  ngOnInit() {
  }

  getAppId() {
    this.loading = true;
    this._apiservice.viewApplication(localStorage.getItem('localityName'))
      .subscribe((data: any) => {
        this.loading = false;
        this.appAudit.applicationID = data.applicationViewDTO.applicationId;
        this.appAuditDTOs = data.applicationViewDTO.appAuditDTOs;
        this.showOnPageLoad();
      }, error => {
        this.loading = false;
        console.log(error);
      });
  }

  showOnPageLoad() {
    if (localStorage.getItem('appAuditId') === null) {

    }
    else {
      this.showEdit = true;
      let id = localStorage.getItem('appAuditId');
      let auid = +id;
      this.editData = this.appAuditDTOs.filter(item => item.appAuditId === auid);

      for (let i = 0; i < this.editData.length; i++) {
        this.appAudit = this.editData[i];
      }
      let day,month,year;
      if (this.appAudit.actionPlanStartDt === null) {
        this.startDate = { date: null };
        this.myForm.controls['endDate'].disable();
      }
      else {
        let d = new Date(this.appAudit.actionPlanStartDt);
         day = d.getDate();
         month = d.getMonth() + 1;
         year = d.getFullYear();
        this.startDate = { date: { year: year, month: month, day: day } };
      }

      if (this.appAudit.actionPlanEndDt === null) {
        this.endDate = { date: null };
      } else {
        let dt = new Date(this.appAudit.actionPlanEndDt);
        let day1 = dt.getDate();
        let month1 = dt.getMonth() + 1;
        let year1 = dt.getFullYear();
        this.endDate = { date: { year: year1, month: month1, day: day1 } };
        this.endDate = { date: { year: year1, month: month1, day: day1 } };
        this.myDatePickerOptions.disableUntil.day = day;
        this.myDatePickerOptions.disableUntil.month = month;
        this.myDatePickerOptions.disableUntil.year = year;
        this.myDatePickerOptions.showTodayBtn = false;
      }



    }

  }

  saveActionPlan() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.loading = true;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let url_update = APP_CONFIG.updateAppAuditInfo;
    this.appAudit.updatedBy = Cookie.get('userName');
    let data = JSON.stringify(this.appAudit);
    this.http.post(url_update, data, options)
      .subscribe((data: any) => {
        this.loading = false;
        const { myForm: { value: formValueSnap } } = this;
        this.myForm.reset(formValueSnap);
        this.info = "Action Plan has been updated.";
        this.modalService.open(this.content, ngbModalOptions);
      }, error => {
        this.loading = false;
        console.log(error);
      });
  }

  getStartDate(value) {

    this.myForm.controls['endDate'].disable();
    this.endDate = null;
    if (value.formatted === "") {
      this.appAudit.actionPlanStartDt = null;
    }
    else {
      
      //this.audate = Date.parse(d);
      let latest_date = this.datepipe.transform(value.formatted, 'yyyy-MM-dd');
      this.appAudit.actionPlanStartDt = moment(latest_date).format();
      let d = new Date(value.formatted);
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate();
      this.myDatePickerOptions.disableUntil.day = day;
      this.myDatePickerOptions.disableUntil.month = month;
      this.myDatePickerOptions.disableUntil.year = year;
      this.myDatePickerOptions.showTodayBtn = false;
      this.myForm.controls['endDate'].enable();
    }

  }


  getEndDate(value) {
    if (value.formatted === "") {
      this.appAudit.actionPlanEndDt = null;
    }
    else {
      let d = value.formatted;
      //this.audate = Date.parse(d);
      let latest_date = this.datepipe.transform(d, 'yyyy-MM-dd');
      this.appAudit.actionPlanEndDt = moment(latest_date).format();
    }

  }
  showAudit() {
    this.router.navigate(['/locality/tab/Audit']);
  }
  valueChanged() {
    this.showForm = false;
    this.showEdit = false;
  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    // console.log(this.myForm);
    // console.log(this.myForm.dirty);
    //if (this.myForm.classList[3] === 'ng-touched' || this.myForm.nativeElement.classList[3] === 'ng-dirty') {
    if (this.myForm.dirty && this.myForm.valid) {
      //return this.dialogService.confirm('Discard changes for Budget?');
      //const modal=this.modalService.open(this.content1, ngbModalOptions);

      //return this.confirm1('Do you want to save changes?', 'for action plan', 'YES', 'NO');


      return new Promise<boolean>((resolve, reject) => {
        this.dialogService.open("Info", " Do you want to save changes for Action Plan?", true, "Yes", "No")
        .then((result) =>{
          if(result)
          {
            this.saveActionPlan();
            resolve(false);
          }
          else{
            resolve(true);
          }
        },error => reject(error));
          
      });

    }
    else{
    return true;
    }

  }




  confirm1(title = 'Are you sure?', text, confirmButtonText, cancelButtonText, showCancelButton = true) {
    return new Promise<boolean>((resolve, reject) => {
      swal({
        title: title,
        text: text,
        type: 'warning',
        showCancelButton: showCancelButton,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        allowOutsideClick: false
      }).then((result) => {
        if (result.value !== undefined && result.value) {
          this.saveActionPlan();
          resolve(false);
        }
        else {
          resolve(true);
        }
      }, error => reject(error));
    });




  }







}
