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

@Component({
  selector: 'app-assess-action',
  templateUrl: './assess-action.component.html',
  styleUrls: ['./assess-action.component.css']
})
export class AssessActionComponent implements OnInit {
  @ViewChild('content') content: TemplateRef<any>;
  @ViewChild('myForm') myForm: FormGroup;
  appAssess: AppAssess;
  public loading: boolean = false;
  public appAssessmentDTOs:any;
  public info:any;
  public showSave:boolean=false;
  public editData:any;
  public showEdit:boolean=false;
  public showForm:boolean=true;
  public endDate:any;
  public startDate:any;
  constructor(private _apiservice: ApiserviceService, private utilService: UtilService,
    private http: Http, private router: Router, private modalService: NgbModal, private datepipe: DatePipe) {
      this.appAssess = new AppAssess();
    this.getAppId();
     }

  ngOnInit() {
  }

  getAppId() {
    this.loading = true;
    this._apiservice.viewApplication(localStorage.getItem('localityName'))
      .subscribe((data: any) => {
        this.loading = false;
        this.appAssess.applicationID = data.applicationViewDTO.applicationId;
        this.showOnPageLoad();
      }, error => {
        this.loading=false;
        console.log(error);});
    }


  showOnPageLoad()
  {
    if(localStorage.getItem('assesId') === null)
    {
    
    }
    else{
      let id =localStorage.getItem('assesId');
      let auid = +id;
      this.loading=true;
      this.showEdit=true;
      this._apiservice.getAssessData(auid)
      .subscribe((data: any) => {
        this.loading=false;
        this.appAssess=data

    if(this.appAssess.actionPlanStartDt === null)
    {
      this.startDate = {date:null};
    }
    else{
    let d = new Date(this.appAssess.actionPlanStartDt);
    let day = d.getDate();
    let month = d.getMonth()+1;
    let year = d.getFullYear();
    this.startDate = {date:{year: year, month: month, day: day}};
    }

    if(this.appAssess.actionPlanEndDt === null)
    {
      this.endDate = {date:null};
    }else{
    let dt = new Date(this.appAssess.actionPlanEndDt);
    let day1 = dt.getDate();
    let month1 = dt.getMonth()+1;
    let year1 = dt.getFullYear();
    this.endDate = {date:{year: year1, month: month1, day: day1}};
    }},error=> {
      this.loading=false;
      console.log(error);});

    

  }
  
}

saveActionPlan()
{
  let ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false
    };
  this.loading = true;
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let options = new RequestOptions({ headers: headers });
  let url_update = APP_CONFIG.updateAppAssessment;
  this.appAssess.updatedBy=Cookie.get('userName');
  let data = JSON.stringify(this.appAssess);
  this.http.post(url_update,data,options)
      .subscribe((data: any) => {
      this.loading=false;
      const { myForm: { value: formValueSnap } } = this;
        this.myForm.reset(formValueSnap);
      this.info="Action Plan has been updated.";
      this.modalService.open(this.content,ngbModalOptions);
      }, error => {
        this.loading = false;
        console.log(error);
      });
}


  getStartDate(value)
    {
      if (value.formatted === "") {
        this.appAssess.actionPlanStartDt=null;
      }
      else {
        let d = value.formatted;
        //this.audate = Date.parse(d);
        let latest_date =this.datepipe.transform(d, 'yyyy-MM-dd');
        this.appAssess.actionPlanStartDt = moment(latest_date).format();
      }
      
    }

     
  getEndDate(value)
  {
    if (value.formatted === "") {
      this.appAssess.actionPlanEndDt=null;
    }
    else {
      let d = value.formatted;
      //this.audate = Date.parse(d);
      let latest_date =this.datepipe.transform(d, 'yyyy-MM-dd');
      this.appAssess.actionPlanEndDt = moment(latest_date).format();
    }
    
  }
  valueChanged()
  {
    this.showForm=false;
    this.showSave=true;
    this.showEdit=false;
  }

  showLeft(){
    this.router.navigate(['locality/tab/assessment']);
    }
    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
      // console.log(this.myForm);
      // console.log(this.myForm.dirty);
      //if (this.myForm.classList[3] === 'ng-touched' || this.myForm.nativeElement.classList[3] === 'ng-dirty') {
      if (this.myForm.dirty) {
        //return this.dialogService.confirm('Discard changes for Budget?');
        //const modal=this.modalService.open(this.content1, ngbModalOptions);
  
        return this.confirm1('Do you want to save changes?', 'for action plan', 'YES', 'NO');
  
  
      }
  
      return true;
  
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
