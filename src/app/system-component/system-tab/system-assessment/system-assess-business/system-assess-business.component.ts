import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
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
import { Cookie } from 'ng2-cookies';

declare var swal: any; ''

@Component({
  selector: 'app-system-assess-business',
  templateUrl: './system-assess-business.component.html',
  styleUrls: ['./system-assess-business.component.css']
})
export class SystemAssessBusinessComponent implements OnInit {
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
    private router: Router, private modalService: NgbModal, private datepipe: DatePipe) {
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
      },
        error => {
          this.loading = false;
          console.log(error);
        });
  }

  showOnPageLoad() {
    if (localStorage.getItem('sysassesId') === null) {
    
    }
    else {
      let id = localStorage.getItem('sysassesId');
      let auid = +id;
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



  saveBusinessRisk() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.loading = true;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let url_update = APP_CONFIG.updateAppAssessment;
    this.appAssess.updatedBy=Cookie.get('userName');
    let data = JSON.stringify(this.appAssess);
    this.http.post(url_update, data, options)
      .subscribe((data: any) => {
        this.loading = false;
        const { myForm: { value: formValueSnap } } = this;
        this.myForm.reset(formValueSnap);
        this.info = "Business Risk has been updated.";
        this.modalService.open(this.content, ngbModalOptions);
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
    this.router.navigate(['system/tab2/assessment']);
    }

    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
      if (this.myForm.dirty) {
        
  
        return this.confirm1('Do you want to save changes?', 'for business risk', 'YES', 'NO');
  
  
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
            this.saveBusinessRisk();
            resolve(false);
          }
          else {
            resolve(true);
          }
        }, error => reject(error));
      });
  
  
  
  
    }
  



}
