import { Component, OnInit,ViewChild,TemplateRef } from '@angular/core';
import { APP_CONFIG } from '../../../../app.config';
import { UtilService } from '../../../../util.service';
import { ApiserviceService } from '../../../../apiservice.service';
import { AppAudit } from '../../../../data.model.auditDTO';
import { IMyDate, IMyDpOptions } from 'mydatepicker';
import {Http, HttpModule, Headers, RequestOptions} from '@angular/http';
import * as moment from 'moment';
import { NgbModal,NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, NgForm, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
declare var swal: any; ''
import { Cookie } from 'ng2-cookies';
import { DialogService } from '../../../../dialog.service';
@Component({
  selector: 'app-audit-lessons',
  templateUrl: './audit-lessons.component.html',
  styleUrls: ['./audit-lessons.component.css']
})
export class AuditLessonsComponent implements OnInit {
  @ViewChild('content') content:TemplateRef<any>;
  @ViewChild('myForm') myForm: FormGroup;

appAudit: AppAudit;
  public appAuditDTOs:any;
  public editData:any;
  public startDate:any;
  public loading:boolean = false;
  public endDate:any;
  public info:string="";
  public showForm:boolean=true;
  public showEdit:boolean=false;
  public updatedBy:any;
  public mainData: any;
  public updatedTime: any;
  constructor( private _apiservice: ApiserviceService, 
    private utilService: UtilService,private http: Http,private modalService: NgbModal,
    private datepipe: DatePipe,private router:Router, private dialogService: DialogService) { 
     
    this.appAudit = new AppAudit();
    this.getAppId();
  }

  ngOnInit() {
  }

  getAppId() {
  this.loading = true;
    this._apiservice.viewApplication(sessionStorage.getItem('localityName'))
      .subscribe((data: any) => {
        this.loading = false;
        this.mainData = data.applicationViewDTO.acronym;
        this.updatedBy =data.applicationViewDTO.updatedBy;
        let d = new Date(data.applicationViewDTO.updatedTime);
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        this.updatedTime = month + "/" + day + "/" + year;
        this.appAudit.applicationID = data.applicationViewDTO.applicationId;
        this.appAuditDTOs = data.applicationViewDTO.appAuditDTOs;
        this.showOnPageLoad();
      }, error => 
      
      {
        this.loading = false;
        console.log(error);}
      );
    }

    showOnPageLoad()
    {
      if(sessionStorage.getItem('appAuditId') === null)
      {
       
      }
      else{
        this.showEdit=true;
        let id =sessionStorage.getItem('appAuditId');
        let auid = +id;
      this.editData = this.appAuditDTOs.filter(item => item.appAuditId === auid);
      
      for(let i=0;i<this.editData.length;i++)
      {
        this.appAudit = this.editData[i];
      }

     

      if(this.appAudit.lessonsEnteredDate === null)
      {
        this.endDate = {date:null};
      }else{
      let dt = new Date(this.appAudit.lessonsEnteredDate);
      let day1 = dt.getDate();
      let month1 = dt.getMonth()+1;
      let year1 = dt.getFullYear();
      this.endDate = {date:{year: year1, month: month1, day: day1}};
      }

      

    }
    
  }

  saveLessons()
  {
    let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false
      };
    this.loading = true;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let url_update = APP_CONFIG.updateAppAuditInfo;
    this.appAudit.updatedBy=Cookie.get('userName');
    let data = JSON.stringify(this.appAudit);
    this.http.post(url_update,data,options)
        .subscribe((data: any) => {
          this.loading = false;
          const { myForm: { value: formValueSnap } } = this;
        this.myForm.reset(formValueSnap);
          this.info="Lessons Learned has been updated.";
          this.modalService.open(this.content,ngbModalOptions);
        }, error => {
          this.loading = false;
          console.log(error);
        });
  }
  
  getEnteredBy(value)
    {
      if (value.formatted === "") {
        
      }
      else {
        let d = value.formatted;
        let latest_date =this.datepipe.transform(d, 'yyyy-MM-dd');
        //this.audate = Date.parse(d);
        //this.appAudit.actionPlanStartDt = d;
      }
      
    }

     
  getEnteredDate(value)
  {
    if (value.formatted === "") {
      this.appAudit.lessonsEnteredDate=null;
    }
    else {
      let d = value.formatted;
      let latest_date =this.datepipe.transform(d, 'yyyy-MM-dd');
      //this.audate = Date.parse(d);
      this.appAudit.lessonsEnteredDate = moment(latest_date).format();
    }
    
  }

  showAudit(){
    this.router.navigate(['/locality/tab/Audit']);
    }
    valueChanged()
  {
    this.showForm = false;
    this.showEdit = false;
  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    // console.log(this.myForm);
    // console.log(this.myForm.dirty);
    //if (this.myForm.classList[3] === 'ng-touched' || this.myForm.nativeElement.classList[3] === 'ng-dirty') {
    if (this.myForm.dirty) {
      //return this.dialogService.confirm('Discard changes for Budget?');
      //const modal=this.modalService.open(this.content1, ngbModalOptions);

      //return this.confirm1('Do you want to save changes?', 'for lessons learned', 'YES', 'NO');


      return new Promise<boolean>((resolve, reject) => {
        this.dialogService.open("Info", " Do you want to save changes for Lessons Learned?", true, "Yes", "No")
        .then((result) =>{
          if(result)
          {
            this.saveLessons();
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
          this.saveLessons();
          resolve(false);
        }
        else {
          resolve(true);
        }
      }, error => reject(error));
    });




  }







}
