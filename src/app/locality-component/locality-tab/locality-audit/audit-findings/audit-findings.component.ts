import { Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import { AppAudit, Policy } from '../../../../data.model.auditDTO';
import { ApiserviceService } from '../../../../apiservice.service';
import { UtilService } from '../../../../util.service';
import {Http, HttpModule, Headers, RequestOptions} from '@angular/http';
import { APP_CONFIG } from '../../../../app.config';
import { Router } from '@angular/router';
import { NgbModal,NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, NgForm, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Cookie } from 'ng2-cookies';
declare var swal: any; ''
import { DialogService } from '../../../../dialog.service';
@Component({
  selector: 'app-audit-findings',
  templateUrl: './audit-findings.component.html',
  styleUrls: ['./audit-findings.component.css']
})
export class AuditFindingsComponent implements OnInit {
  @ViewChild('content') content:TemplateRef<any>;
  @ViewChild('myForm') myForm: FormGroup;

  appAudit: AppAudit;
  public appAuditDTOs:any;
  public editData:any;
  public showForm:boolean = true;
  public showEdit:boolean = false;
  public loading:boolean = false;
  public info:string ="";
  public updatedBy:any;
  public mainData: any;
  public updatedTime: any;
  //public showEdit:boolean=true;
  constructor( private _apiservice: ApiserviceService, private utilService: UtilService,
    private  http: Http,private router: Router, private modalService: NgbModal, private dialogService: DialogService) { 
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
      }, error => {
        this.loading=false;
        console.log(error);});
    }

    showOnPageLoad()
    {
      if(sessionStorage.getItem('appAuditId') === null)
      {
        console.log('Not edit mode');
      }
      else{
        this.showEdit = true;
        let id = sessionStorage.getItem('appAuditId');
        let auid = +id;
      this.editData = this.appAuditDTOs.filter(item => item.appAuditId === auid);
      
      for(let i=0;i<this.editData.length;i++)
      {
        this.appAudit = this.editData[i];
      }
     
    
    }
  }
   





  saveFindings()
  {
    let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false
      };
    this.loading=true;
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
          this.info ="Findings has been updated.";
          this.modalService.open(this.content,ngbModalOptions);
        }, error => {
          this.loading=false;
          console.log(error);
        });
  }

  valueChanged()
  {
    this.showForm = false;
    this.showEdit = false;
  }

  showAudit(){
    this.router.navigate(['/locality/tab/Audit/']);
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    // console.log(this.myForm);
    // console.log(this.myForm.dirty);
    
    //if (this.myForm.classList[3] === 'ng-touched' || this.myForm.nativeElement.classList[3] === 'ng-dirty') {
      if(this.myForm.dirty){
      //return this.dialogService.confirm('Discard changes for Budget?');
      //const modal=this.modalService.open(this.content1, ngbModalOptions);

    //return  this.confirm1('Do you want to save changes?', 'for findings', 'YES', 'NO');
       

    return new Promise<boolean>((resolve, reject) => {
      this.dialogService.open("Info", " Do you want to save changes for Findings?", true, "Yes", "No")
      .then((result) =>{
        if(result)
        {
          this.saveFindings();
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
          this.saveFindings();
          resolve(false);
        }
        else {
          resolve(true);
        }
      }, error => reject(error));
    });




  }
  

}
