import { Component, OnInit, ViewChild, TemplateRef, ElementRef, HostListener } from '@angular/core';
import { ApiserviceService } from '../../../../apiservice.service';
import { UtilService } from '../../../../util.service';
import { AlertService } from '../../../../alert.service';
import { DialogService } from '../../../../dialog.service';
import { AppAudit } from '../../../../data.model.auditDTO';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { APP_CONFIG } from '../../../../app.config';
import { Cookie } from 'ng2-cookies';
import { IMyDate, IMyDpOptions } from 'mydatepicker';
import { Router, ActivatedRoute, Params, RouterStateSnapshot } from '@angular/router';
import * as moment from 'moment';
import { FormsModule, NgForm, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { AppAssess, AssessmentPolicyDTO, Policy } from '../../../../data.model.assessmentDTO';
import { Observable, Subject } from 'rxjs';
let ngbModalOptions: NgbModalOptions = {
  backdrop: 'static',
  keyboard: false
};
declare var swal: any; ''

@Component({
  selector: 'app-system-assess-budget',
  templateUrl: './system-assess-budget.component.html',
  styleUrls: ['./system-assess-budget.component.css'],
  providers: [AlertService, DialogService]
})
export class SystemAssessBudgetComponent implements OnInit {

  @ViewChild('content') content: TemplateRef<any>;
  @ViewChild('content1') content1: TemplateRef<any>;
  // @ViewChild('myForm', { read: ElementRef }) myForm: ElementRef<any>;
  @ViewChild('myForm') myForm: FormGroup;
  // @ViewChild('lastName', { read: ElementRef }) lastName: ElementRef<any>;
  appAssess: AppAssess;
  public loading: boolean = false;
  public info: any;
  public showSave: boolean = false;
  public editData: any;
  public showEdit: boolean = false;
  public showForm: boolean = true;
  public closeResult: any;


  constructor(private _apiservice: ApiserviceService,
    private utilService: UtilService, private http: Http, private route: ActivatedRoute,
    private router: Router, private modalService: NgbModal, private datepipe: DatePipe,
    private alertservice: AlertService, private dialogService: DialogService) {

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
        this.loading = false;
        console.log(error);
      });
  }

  showOnPageLoad() {
    if (localStorage.getItem('assesId') === null) {
    }
    else {
      let id = localStorage.getItem('assesId');
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



  saveBudget() {

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
        //this.myForm.nativeElement.reset({description: this.appAssess.budgetDescription, overallEstimates: this.appAssess.budget});
        const { myForm: { value: formValueSnap } } = this;
        this.myForm.reset(formValueSnap);
        this.info = "Budget has been updated.";
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

  showLeft() {
    this.router.navigate(['system/tab2/assessment']);
  }


  //@HostListener('window:beforeunload', ['$event'])
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.myForm.dirty) {

      return this.confirm1('Do you want to save changes?', 'for budget', 'YES', 'NO');


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
          this.saveBudget();
          resolve(false);
        }
        else {
          resolve(true);
        }
      }, error => reject(error));
    });




  }
  goTo() {
    //let url=this.state.url;
    let snapshot: RouterStateSnapshot = this.router.routerState.snapshot;
    let url = snapshot.url
    console.log(url);
    this.router.navigateByUrl(url);
  }
}
