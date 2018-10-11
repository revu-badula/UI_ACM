import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ApiserviceService } from '../../../../apiservice.service';
import { UtilService } from '../../../../util.service';
import { AppAudit } from '../../../../data.model.auditDTO';
import {Http, HttpModule, Headers, RequestOptions} from '@angular/http';
import { APP_CONFIG } from '../../../../app.config';
import { IMyDate, IMyDpOptions } from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';
import { NgbModal,NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { FormsModule, NgForm, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
declare var swal: any; ''
import { Cookie } from 'ng2-cookies';
import { DialogService } from '../../../../dialog.service';

@Component({
  selector: 'app-audit-management',
  templateUrl: './system-audit-management.component.html',
  styleUrls: ['./system-audit-management.component.css']
})
export class SystemAuditManagementComponent implements OnInit {

  @ViewChild('content') content:TemplateRef<any>;
  @ViewChild('myForm') myForm: FormGroup;

  appAudit: AppAudit;
  public appAuditDTOs:any;
  public editData:any;
  public resDate:any;
  public info:string="";
  public showEdit:boolean=false;
  public showForm:boolean = true;
  public loading:boolean = false;
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd'
  };
 
  constructor( private _apiservice: ApiserviceService, 
    private utilService: UtilService,private http: Http,private route: ActivatedRoute,
    private router:Router, private modalService: NgbModal,private datepipe: DatePipe, private dialogService: DialogService) { 
    
    this.appAudit = new AppAudit();
    this.getAppId();
  }

  ngOnInit() {
  }

  getAppId() {
    this.loading=true;
    this._apiservice.viewApplication(localStorage.getItem('systemName'))
      .subscribe((data: any) => {
        this.loading=false;
        this.appAudit.applicationID = data.applicationViewDTO.applicationId;
        this.appAuditDTOs = data.applicationViewDTO.appAuditDTOs;
        this.showOnPageLoad();
      }, error => {
        this.loading=false;
        console.log(error);
      });
    }

    showOnPageLoad()
    {
      if(localStorage.getItem('systemAppAuditId') === null)
      {
       
      }
      else{
        this.showEdit=true;
        let id =localStorage.getItem('systemAppAuditId');
        let auid = +id;
      this.editData = this.appAuditDTOs.filter(item => item.appAuditId === auid);
      
      for(let i=0;i<this.editData.length;i++)
      {
        this.appAudit = this.editData[i];
      }
      if(this.appAudit.responseDt === null)
      {
        this.resDate = {date:null};
      }
      else{
      let d = new Date(this.appAudit.responseDt);
      let day = d.getDate();
      let month = d.getMonth()+1;
      let year = d.getFullYear();
      this.resDate = {date:{year: year, month: month, day: day}};
      }
      

    }
    
  }

  saveManagement()
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
        this.loading=false;
        const { myForm: { value: formValueSnap } } = this;
        this.myForm.reset(formValueSnap);
        this.info="Management Response has been updated."
        this.modalService.open(this.content,ngbModalOptions);
        }, error => {
          this.loading=false;
          console.log(error);
        });
  }
  
  getResDate(value)
    {
      if (value.formatted === "") {
        this.appAudit.responseDt=null;
      }
      else {
        let d = value.formatted;
        let latest_date =this.datepipe.transform(d, 'yyyy-MM-dd');
        //this.audate = Date.parse(d);
        this.appAudit.responseDt = moment(latest_date).format();
      }
      
    }

 showAudit(){
 this.router.navigate(['/system/tab2/Audit']);
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

    //return this.confirm1('Do you want to save changes?', 'for management response', 'YES', 'NO');
    return new Promise<boolean>((resolve, reject) => {
      this.dialogService.open("Info", " Do you want to save changes for Management Response?", true, "Yes", "No")
      .then((result) =>{
        if(result)
        {
          this.saveManagement();
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
        this.saveManagement();
        resolve(false);
      }
      else {
        resolve(true);
      }
    }, error => reject(error));
  });




}


}