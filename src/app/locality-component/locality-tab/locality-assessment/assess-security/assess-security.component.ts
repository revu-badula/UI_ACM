import { Component, OnInit , ViewChild, TemplateRef} from '@angular/core';
import { ApiserviceService } from '../../../../apiservice.service';
import { UtilService } from '../../../../util.service';
import { AppAudit } from '../../../../data.model.auditDTO';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { APP_CONFIG } from '../../../../app.config';
import { IMyDate, IMyDpOptions } from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { AppAssess, AssessmentPolicyDTO, Policy } from '../../../../data.model.assessmentDTO';
import { FormsModule, NgForm, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
declare var swal: any; ''
import { Cookie } from 'ng2-cookies';
import { DialogService } from '../../../../dialog.service';
@Component({
  selector: 'app-assess-security',
  templateUrl: './assess-security.component.html',
  styleUrls: ['./assess-security.component.css']
})
export class AssessSecurityComponent implements OnInit {
  @ViewChild('content') content: TemplateRef<any>;
  @ViewChild('myForm') myForm: FormGroup;
  appAssess: AppAssess;
  public loading: boolean = false;
  public info: any;
  public showSave: boolean = false;
  public editData: any;
  public showEdit: boolean = false;
  public showForm: boolean = true;
  constructor(private _apiservice: ApiserviceService,
    private utilService: UtilService, private http: Http, private route: ActivatedRoute,
    private router: Router, private modalService: NgbModal, private datepipe: DatePipe, private dialogService: DialogService) { 
      this.appAssess = new AppAssess();
      this.getAppId();
    }

  ngOnInit() {
  }


  getAppId() {
    this.loading = true;
      this._apiservice.viewApplication(sessionStorage.getItem('localityName'))
        .subscribe((data: any) => {
          this.loading = false;
          this.appAssess.applicationID = data.applicationViewDTO.applicationId;
          this.showOnPageLoad();
        }, error => {
          this.loading = false;
          console.log(error);});
      }
  
      showOnPageLoad()
      {
        if(sessionStorage.getItem('assesId') === null)
        {
          console.log('Not edit mode');
        }
        else{
          let id =sessionStorage.getItem('assesId');
          let auid = +id;
        // this.editData = this.appAuditDTOs.filter(item => item.appAuditId === auid);
        
        // for(let i=0;i<this.editData.length;i++)
        // {
        //   this.appAudit = this.editData[i];
        // }
        this.showEdit = true;
        this.loading = true;
        this._apiservice.getAssessData(auid)
          .subscribe((data: any) => {
            this.loading = false;
            this.appAssess = data;
          }, error => {
            this.loading = false;
            console.log(error);
          });
  
      
  
        
  
      }
      
    }
    

  saveSecurityRisk()
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
        this.loading = false;
        const { myForm: { value: formValueSnap } } = this;
        this.myForm.reset(formValueSnap);
        this.info="Security Risk has been updated.";
        this.modalService.open(this.content,ngbModalOptions);
        }, error => {
          this.loading = false;
          console.log(error);
        });
  }

  valueChanged() {
    this.showForm = false;
    this.showSave = true;
    this.showEdit = false;
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
  
        //return this.confirm1('Do you want to save changes?', 'for security risk', 'YES', 'NO');
  
  
        return new Promise<boolean>((resolve, reject) => {
          this.dialogService.open("Info", " Do you want to save changes for Security Risk?", true, "Yes", "No")
          .then((result) =>{
            if(result)
            {
              this.saveSecurityRisk();
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
            this.saveSecurityRisk();
            resolve(false);
          }
          else {
            resolve(true);
          }
        }, error => reject(error));
      });
  
  
  
  
    }
  

}
