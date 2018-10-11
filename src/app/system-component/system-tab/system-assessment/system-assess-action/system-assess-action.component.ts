import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../../../../apiservice.service';
import { UtilService } from '../../../../util.service';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { APP_CONFIG } from '../../../../app.config';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AppAssess, AssessmentPolicyDTO, Policy } from '../../../../data.model.assessmentDTO';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { FormsModule, NgForm, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
declare var swal: any; ''
import { Cookie } from 'ng2-cookies';
import { IMyDate, IMyDpOptions } from 'mydatepicker';
import { DialogService } from '../../../../dialog.service';
@Component({
  selector: 'app-system-assess-action',
  templateUrl: './system-assess-action.component.html',
  styleUrls: ['./system-assess-action.component.css']
})
export class SystemAssessActionComponent implements OnInit {

  @ViewChild('content') content: TemplateRef<any>;
  @ViewChild('myForm') myForm: FormGroup;
  appAssess: AppAssess;
  public loading: boolean = false;
  public appAssessmentDTOs: any;
  public info: any;
  public showSave: boolean = false;
  public editData: any;
  public showEdit: boolean = false;
  public showForm: boolean = true;
  public endDate: any;
  public startDate: any;
  myDatePickerOptions: IMyDpOptions = {
    disableUntil: { year: 0, month: 0, day: 0 },
    showTodayBtn: false

  };
  constructor(private _apiservice: ApiserviceService, private utilService: UtilService,
    private http: Http, private router: Router, private modalService: NgbModal, 
    private datepipe: DatePipe, private dialogService: DialogService) {
    this.appAssess = new AppAssess();
    this.getAppId();
  }

  ngOnInit() {
  }

  getAppId() {
    this.loading = true;
    this._apiservice.viewApplication(localStorage.getItem('systemName'))
      .subscribe((data: any) => {
        this.loading = false;
        this.appAssess.applicationID = data.applicationViewDTO.applicationId;
        this.showOnPageLoad();
      }, error => {
        this.loading = false;
        console.log(error);
      });
  }


  showOnPageLoad() {
    if (localStorage.getItem('sysassesId') === null) {
      console.log('Not edit mode');
    }
    else {
      let id = localStorage.getItem('sysassesId');
      let auid = +id;
      this.loading = true;
      this.showEdit = true;
      this._apiservice.getAssessData(auid)
        .subscribe((data: any) => {
          this.loading = false;
          this.appAssess = data
          let day,month,year;
          if (this.appAssess.actionPlanStartDt === null) {
            this.startDate = { date: null };
            this.myForm.controls['endDate'].disable();
          }
          else {
            let d = new Date(this.appAssess.actionPlanStartDt);
             day = d.getDate();
             month = d.getMonth() + 1;
             year = d.getFullYear();
            this.startDate = { date: { year: year, month: month, day: day } };
          }

          if (this.appAssess.actionPlanEndDt === null) {
            this.endDate = { date: null };
          } else {
            let dt = new Date(this.appAssess.actionPlanEndDt);
            let day1 = dt.getDate();
            let month1 = dt.getMonth() + 1;
            let year1 = dt.getFullYear();
            this.endDate = { date: { year: year1, month: month1, day: day1 } };
            this.myDatePickerOptions.disableUntil.day = day;
            this.myDatePickerOptions.disableUntil.month = month;
            this.myDatePickerOptions.disableUntil.year = year;
            this.myDatePickerOptions.showTodayBtn = false;
          }
        }, error => {
          this.loading = false;
          console.log(error);
        });



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
    let url_update = APP_CONFIG.updateAppAssessment;
    this.appAssess.updatedBy = Cookie.get('userName');
    let data = JSON.stringify(this.appAssess);
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
      this.appAssess.actionPlanStartDt = null;
    }
    else {
      let latest_date = this.datepipe.transform(value.formatted, 'yyyy-MM-dd');
      this.appAssess.actionPlanStartDt = moment(latest_date).format();
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
      this.appAssess.actionPlanEndDt = null;
    }
    else {
      let d = value.formatted;
      let latest_date = this.datepipe.transform(d, 'yyyy-MM-dd');
      this.appAssess.actionPlanEndDt = moment(latest_date).format();
    }

  }
  valueChanged() {
    this.showForm = false;
    this.showSave = true;
    this.showEdit = false;
  }

  showLeft() {
    this.router.navigate(['system/tab2/assessment']);
  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {

    if (this.myForm.dirty && this.myForm.valid) {


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
