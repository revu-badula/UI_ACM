import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ApiserviceService } from '../../../../apiservice.service';
import { IMyDate, IMyDpOptions } from 'mydatepicker';
import { AppAudit, Policy } from '../../../../data.model.auditDTO';
import { UtilService } from '../../../../util.service';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { APP_CONFIG } from '../../../../app.config';
import { HttpClient } from "@angular/common/http";
import { FilterPipeDate } from '../../../locality-date-filter';
import { FilterAuditName } from '../../../locality-auditname-filter';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { Cookie } from 'ng2-cookies';
import { FormsModule, NgForm, FormGroup } from '@angular/forms';
declare var swal: any; ''

@Component({
  selector: 'app-audit-first',
  templateUrl: './audit-first.component.html',
  styleUrls: ['./audit-first.component.css']

})
export class AuditFirstComponent implements OnInit {
  @ViewChild('fileInput') inputEl: ElementRef;
  @ViewChild('content1') content: TemplateRef<any>;
  @ViewChild('myForm') myForm: FormGroup;
  public showSection: boolean = false;
  policies: Policy[];
  public p: number = 1;
  public showTable: boolean = false;
  public definitive: boolean;
  public policy: boolean;
  public policyData: any;
  public auditTypes: any;
  public audate: any;
  public policyTypes: any;
  public yesfile: boolean = false;
  showInitial: boolean = false;
  public info: any
  public showEditMode: boolean = false;
  public appAuditId: any;
  myDatePickerOptions: IMyDpOptions = {
    disableUntil: { year: 0, month: 0, day: 0 },
    showTodayBtn: false

  };
  appAudit: AppAudit;
  public changeOverallStatus: boolean = false;

  appId: any;
  auditDate: any;
  nextDate: any;
  auditTypeId: any;
  policyDisplay: Policy;
  public err: string;
  public err1: string;
  public errorfile: string = "";
  public naudt: any;
  public showStatus: boolean = false;
  public showStatus1: boolean = true;
  public polName: any;
  public hideTable: boolean = true;
  public showLegalBox: boolean = true;
  public showHistory: boolean = false;
  public mainData: any;
  public showButton: boolean = false;
  public updatedTime: any;
  public desc: boolean = false;
  public appAuditDTOs: any;
  public editData: any;
  public showOriginal: boolean = true;
  public showEdit: boolean = false;
  public policyNameArray: any;
  public attachment: any;
  public vauditDate: any;
  public comparePolicyDTO: any;
  public loading: boolean = false;
  public policyName: boolean = false;
  public priority: boolean = false;
  constructor(private modalService: NgbModal, private http: Http,
    private _apiservice: ApiserviceService, private utilService: UtilService,
    private router: Router, private route: ActivatedRoute, public datepipe: DatePipe) {
    this.appAudit = new AppAudit();
    this.policyDisplay = new Policy();
    this.policies = [];
    this.getAppId();



  }

  ngOnInit() {

    this.showDropdown();
  }

  getAppId() {
    this.loading = true;
    this._apiservice.viewApplication(localStorage.getItem('localityName'))
      .subscribe((data: any) => {
        this.loading = false;
        this.appAudit.applicationID = data.applicationViewDTO.applicationId;
        this.mainData = data.applicationViewDTO.acronym;
        let d = new Date(data.applicationViewDTO.updatedTime);
        this.appAuditDTOs = data.applicationViewDTO.appAuditDTOs;
        this.showOnPageLoad();
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        this.updatedTime = month + "/" + day + "/" + year;
      }, error => {
        this.loading = false;
        console.log(error);
      });

  }

  showOnPageLoad() {
    if (localStorage.getItem('appAuditId') === null) {
      this.myForm.controls['nextDate'].disable();
    }
    else {
      UtilService.auditActive = true;
      localStorage.setItem('auditActive', 'true');
      this.showOriginal = false;
      this.showButton = true;
      this.showInitial = true;
      this.showLegalBox=false;
      this.showEdit = true;
      let id = localStorage.getItem('appAuditId');
      let appauid: number = +id;
      this.editData = this.appAuditDTOs.filter(item => item.appAuditId === appauid);

      for (let i = 0; i < this.editData.length; i++) {
        this.appAudit = this.editData[i];
      }
      this.policies = this.appAudit.auditPolicyDTOs;
      this.showTable = true;
      this.getPolicyName(this.appAudit.auditName)
      let d = new Date(this.appAudit.auditDate);
      
      let day = d.getDate();
      let month = d.getMonth() + 1;
      let year = d.getFullYear();
      this.vauditDate = month + "/" + day + "/" + year;
      this.auditDate = { date: { year: year, month: month, day: day } };

      let d1 = new Date(this.appAudit.nextAuditDate);
     
      let day1 = d1.getDate();
      let month1 = d1.getMonth() + 1;
      let year1 = d1.getFullYear();
      this.nextDate = { date: { year: year1, month: month1, day: day1 } };
     

      this.myDatePickerOptions.disableUntil.day = day;
      this.myDatePickerOptions.disableUntil.month = month;
      this.myDatePickerOptions.disableUntil.year = year;
      this.myDatePickerOptions.showTodayBtn = false;

    }
  }

  getPolicyName(auditId) {
    this.loading = true;
    this._apiservice.getPolicyGroup(auditId)
      .subscribe((data: any) => {
        this.loading = false;
        this.policyNameArray = data.filter(item => item.policyGrpId === this.appAudit.policyGrpId);
        for (let i = 0; i < this.policyNameArray.length; i++) {
          this.comparePolicyDTO = this.policyNameArray[i];
          this.polName = this.policyNameArray[i].policyGrpName;
        }
      }, error => {
        this.loading = false;
        console.log(error);
      });

  }

  open(content) {
    this.errorfile = "";
    this.modalService.open(content);
  }


  showAudit() {
    this.router.navigate(['/locality/tab/Audit/']);
  }

  showHist() {
    this.showHistory = true;
  }

  showDropdown() {

    this._apiservice.getAuditTypes()
      .subscribe((data: any) => {
        this.auditTypes = data;
      }, error => { console.log(error); });


  }

  selectDefinitive(auditID) {

    if (auditID === 'Choose...' || auditID === "") {
      this.definitive = false
      this.showTable = false;
   
      this.policyTypes = [];
    }
    else {
      
      this.definitive = true;
      this.auditTypeId = auditID;
      this.appAudit.auditName = auditID;
      this._apiservice.getPolicyGroup(auditID)
        .subscribe((data: any) => {
          this.policyTypes = data;
        }, error => { console.log(error) });
    }
  }


  selectType(policy) {
    if (policy === 'Choose...' || policy === "") {
      this.showTable = false;
      
      this.policies = [];

    }
    else {
     
      //this.appAudit.policyDTOs.policyGrpId = policy;
      this.appAudit.policyGrpId = policy;
      this._apiservice.fetchPolicies(policy)
        .subscribe((data: any) => {
          this.showTable = true;
          this.policies = data.policyDTOs;
        }, error => {
          console.log(error);
        });

    }
  }

  getAuditDate(value) {

    this.myForm.controls['nextDate'].disable();
    this.nextDate = null;
    if (value.formatted === "") {
    
    }
    else {
 
      let latest_date = this.datepipe.transform(value.formatted, 'yyyy-MM-dd');
      this.appAudit.auditDate = moment(latest_date).format();
      let d=new Date(value.formatted);
      let year=d.getFullYear();
      let month=d.getMonth()+1;
      let day=d.getDate();
      this.myDatePickerOptions.disableUntil.day = day;
      this.myDatePickerOptions.disableUntil.month = month;
      this.myDatePickerOptions.disableUntil.year = year;
      this.myDatePickerOptions.showTodayBtn = false;
     
      this.myForm.controls['nextDate'].enable();
     

    }
  }

  getDate(value) {

    if (value.formatted === "") {
      
    }
    else {
      
      let latest_date = this.datepipe.transform(value.formatted, 'yyyy-MM-dd');
      
      this.appAudit.nextAuditDate = moment(latest_date).format();
      
    }

  }


  getNextDate(value) {

    if (value === 'Choose...' || value === "") {
      this.showLegalBox = false;
    }
    else {
      this.appAudit.status = value;
      this.changeOverallStatus = true;
      this.showLegalBox = true;


     

    }

  }



  compareDate(d, ddt): boolean {
    return new Date(ddt) > new Date(d);
  }


  saveAudit() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.loading = true;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    if (this.appAudit.appAuditId === undefined) {
      let url_update = APP_CONFIG.saveAppAuditInfo;
      for (let i = 0; i < this.policies.length; i++) {
        this.appAudit.auditPolicyDTOs.push(this.policies[i]);
      }

      this.appAudit.createdBy = Cookie.get('userName');
      let data = JSON.stringify(this.appAudit);
      this.http.post(url_update, data, options)
        .subscribe((data: any) => {
          //console.log(data);
          //UtilService.auditActive = true;
          this.loading = false;
          const { myForm: { value: formValueSnap } } = this;
          this.myForm.reset(formValueSnap);
          this.info = "Audit has been created.";
          this.modalService.open(this.content, ngbModalOptions);

        }, error => {
          this.loading = false;
          console.log(error);
        });
    }

    else {
      let url_update = APP_CONFIG.updateAppAuditInfo;
      // for(let i=0;i<this.policies.length;i++)
      // {
      // this.appAudit.auditPolicyDTOs.push(this.policies[i]);
      // }
      this.appAudit.updatedBy = Cookie.get('userName');
      let data = JSON.stringify(this.appAudit);
      this.http.post(url_update, data, options)
        .subscribe((data: any) => {
          this.loading = false;
          this.showButton = true;
          this.changeOverallStatus = false;
          const { myForm: { value: formValueSnap } } = this;
          this.myForm.reset(formValueSnap);
          this.info = "Audit has been updated.";
          this.modalService.open(this.content, ngbModalOptions);
        }, error => {
          this.loading = false;
          console.log(error);
        });

    }
  }

  redirect() {
    this.router.navigate(['/locality/tab/Audit']);
  }

  goTo() {
    this.router.navigate(['/locality/tab/Audit/Tab/find']);

  }


  valueChanged() {
    this.showInitial = false;
    this.showEdit = false;
    this.showOriginal = false;
    this.showStatus = true;
    this.showStatus1 = false;
    this.showLegalBox=true;

  }


  getFile(fileInput: any) {
    let files = fileInput.target.files[0];
    if (files === undefined) {

    }
    else {

      let fileName = fileInput.target.files[0].name;
      this.attachment = fileInput.target.files[0];
      this.yesfile = true;
      this.getFileContent(fileInput.target.files[0])
        .then(
          data => {
            //this.yesfile = true;
            //this.attachment = data;
          });

    }

  }

  getFileContent(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result)

      };
      reader.onerror = (error) => {
        reject(error);
      };
    });


  }


  compareFile() {
    const headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    let options = new RequestOptions({ headers: headers });
    let url = APP_CONFIG.comparePolicyFile;
    if (this.yesfile) {
      var formData = new FormData();
      formData.append('file', this.attachment);
      formData.append('policy', JSON.stringify(this.comparePolicyDTO));
      formData.append('policies', JSON.stringify(this.policies));
      this.yesfile = false;
      //this._apiservice.comparePolicyFile(formData)
      this.http.post(url, formData).map(res => { return res.json(); })
        .subscribe((data: any) => {
          console.log(data.auditPolicyDTOs);
        }, error => {
          this.errorfile = "invalid file for compare";
        });

    }
    else {

    }
  }


  downloadFile() {
    window.open(APP_CONFIG.generatePolicyFile + '?' + 'policyGrpId' + '=' + this.appAudit.policyGrpId);

  }


  handleSort() {
    if (!this.desc) {
      this.policies.sort(this.doAsc);
      this.desc = true;
    }
    else {
      this.policies.sort(this.doDsc);
      this.desc = false;
    }

  }
  doAsc(a, b) {
    if (a.controlNumber > b.controlNumber) {
      return -1;
    } else if (a.controlNumber < b.controlNumber) {
      return 1;
    }
    return 0;
  }

  doDsc(a, b) {
    if (a.controlNumber < b.controlNumber) {
      return -1;
    } else if (a.controlNumber > b.controlNumber) {
      return 1;
    }
    return 0;
  }

  handleSort1(value) {
    if (!this.policyName) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.policies.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.policyName = true;
    }
    else {
      let orderByValue = value;
      this.policies.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.policyName = false;
    }


  }


  handleSort2(value) {
    if (!this.priority) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.policies.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.priority = true;
    }
    else {
      let orderByValue = value;
      this.policies.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.priority = false;
    }


  }


  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    // console.log(this.myForm);
    // console.log(this.myForm.dirty);
    //if (this.myForm.classList[3] === 'ng-touched' || this.myForm.nativeElement.classList[3] === 'ng-dirty') {
    // if (this.changeOverallStatus && this.showButton) {
      if(this.myForm.dirty && this.myForm.valid){
      //return this.dialogService.confirm('Discard changes for Budget?');
      //const modal=this.modalService.open(this.content1, ngbModalOptions);

      return this.confirm1('Do you want to save changes?', 'for details', 'YES', 'NO');


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
          this.saveAudit();
          resolve(false);
        }
        else {
          resolve(true);
        }
      }, error => reject(error));
    });




  }



}
