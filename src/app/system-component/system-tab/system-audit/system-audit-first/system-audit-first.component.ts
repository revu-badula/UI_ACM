import { Component, OnInit, ViewChild, ElementRef, TemplateRef, ViewChildren, QueryList } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ApiserviceService } from '../../../../apiservice.service';
import { IMyDpOptions } from 'mydatepicker';
import { AppAudit, Policy } from '../../../../data.model.auditDTO';
import { UtilService } from '../../../../util.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { APP_CONFIG } from '../../../../app.config';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies';
import { FormGroup } from '@angular/forms';
import { DialogService } from '../../../../dialog.service';
import { NgbdSortableHeader, SortEvent } from '../../../../sort';
declare var swal: any; ''


@Component({
  selector: 'app-audit-first',
  templateUrl: './system-audit-first.component.html',
  styleUrls: ['./system-audit-first.component.css']

})
export class SystemAuditFirstComponent implements OnInit {
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
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
  public showAbove89: boolean = false;
  public showAbove74: boolean = false;
  public showAbove50: boolean = false;
  public openList: boolean = false;
  public closeList: boolean = false;
  public evNotList: boolean = false;
  public showPagination: boolean = false;

  public totalAudits: any;
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
  public errorfile: string = "";
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
  public policyErr: any;
  public editData: any;
  public showOriginal: boolean = true;
  public showEdit: boolean = false;
  public policyNameArray: any;
  public attachment: any;
  public vauditDate: any;
  public comparePolicyDTO: any;
  public policyName: boolean = false;
  public priority: boolean = false;
  public loading: boolean = false;
  constructor(private modalService: NgbModal, private http: Http,
    private _apiservice: ApiserviceService, private utilService: UtilService,
    private router: Router, private route: ActivatedRoute,
    public datepipe: DatePipe, private dialogService: DialogService, private httpClient: HttpClient) {
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
    this._apiservice.viewApplication(sessionStorage.getItem('systemName'))
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
    if (sessionStorage.getItem('systemAppAuditId') === null) {
      this.myForm.controls['nextDate'].disable();
    }
    else {
      UtilService.auditActive = true;
      sessionStorage.setItem('systemAuditActive', 'true');
      this.showOriginal = false;
      this.showButton = true;
      this.showInitial = true;
      this.showEdit = true;
      this.showLegalBox = false;
      let id = sessionStorage.getItem('systemAppAuditId');
      let appauid: number = +id;
      // this.editData = this.appAuditDTOs.filter((item:any) => item.appAuditId === appauid);

      // for (let i = 0; i < this.editData.length; i++) {
      //   this.appAudit = this.editData[i];
      // }
      // this.policies = this.appAudit.auditPolicyDTOs;
      // this.showTable = true;
      // this.getPolicyName(this.appAudit.auditName)
      let url = APP_CONFIG.appAudit;
      this.loading = true;
      this.httpClient.get(url + "?" + "auditId=" + appauid)
        .subscribe((data: any) => {
          this.loading = false;
          this.appAudit = data;
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
          this.getPolicyName(this.appAudit.auditName);
        }, error => {
          this.loading = false;
          console.log(error);
        });


    }
  }

  getPolicyName(auditId: any) {
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

  open(content: any) {
    this.errorfile = "";
    this.modalService.open(content);
  }


  showAudit() {
    this.router.navigate(['/system/tab2/Audit/']);
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

  selectDefinitive(auditID: any) {

    if (auditID === 'Choose...' || auditID === "") {
      this.definitive = false
      this.showTable = false;

      this.policyTypes = [];
    }
    else {
      this.loading = true;
      this.definitive = true;
      this.auditTypeId = auditID;
      this.appAudit.auditName = auditID;
      this._apiservice.fetchPolicyGroupForAA(auditID)
        .subscribe((data: any) => {
          this.loading = false;
          this.policyTypes = data;
          if (data.length > 0) {
            this.policyErr = "";
          }
          else {
            this.policyErr = "select source with controls."
          }
        }, error => {
          this.loading = false;
          console.log(error)
        });
    }
  }


  selectType(policy: any) {
    if (policy === 'Choose...' || policy === "") {
      this.showTable = false;

      this.policies = [];

    }
    else {

      //this.appAudit.policyDTOs.policyGrpId = policy;
      this.loading = true;
      this.appAudit.policyGrpId = policy;
      this._apiservice.fetchPolicies(policy)
        .subscribe((data: any) => {
          this.showTable = true;
          this.loading = false;
          this.policies = data.policyDTOs;
        }, error => {
          this.loading = false;
          console.log(error);
        });

    }
  }

  getAuditDate(value: any) {
    this.myForm.controls['nextDate'].disable();
    this.nextDate = null;
    if (value.formatted === "") {

    }
    else {
      this.nextDate = null;
      let latest_date = this.datepipe.transform(value.formatted, 'yyyy-MM-dd');
      this.appAudit.auditDate = moment(latest_date).format();
      let d = new Date(value.formatted);
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate();
      this.myDatePickerOptions.disableUntil.day = day;
      this.myDatePickerOptions.disableUntil.month = month;
      this.myDatePickerOptions.disableUntil.year = year;
      this.myDatePickerOptions.showTodayBtn = false;

      this.myForm.controls['nextDate'].enable();


    }
  }

  getDate(value: any) {

    if (value.formatted === "") {

    }
    else {

      let latest_date = this.datepipe.transform(value.formatted, 'yyyy-MM-dd');

      this.appAudit.nextAuditDate = moment(latest_date).format();

    }

  }


  getNextDate(value: any) {

    if (value === 'Choose...' || value === "") {

    }
    else {
      this.appAudit.status = value;
      this.changeOverallStatus = true;





    }

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
          this.info = "System has been created.";
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
          this.info = "System has been updated.";
          this.modalService.open(this.content, ngbModalOptions);
        }, error => {
          this.loading = false;
          console.log(error);
        });

    }
  }

  redirect() {
    this.router.navigate(['/system/tab2/Audit']);
  }

  goTo() {
    this.router.navigate(['/system/tab2/Audit/Tab/find']);

  }


  valueChanged() {
    this.showInitial = false;
    this.showEdit = false;
    this.showOriginal = false;
    this.showStatus = true;
    this.showStatus1 = false;
    this.showLegalBox = true;

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
    if (this.myForm.dirty && this.myForm.valid) {
      //return this.dialogService.confirm('Discard changes for Budget?');
      //const modal=this.modalService.open(this.content1, ngbModalOptions);

      //return this.confirm1('Do you want to save changes?', 'for details', 'YES', 'NO');

      return new Promise<boolean>((resolve, reject) => {
        this.dialogService.open("Info", " Do you want to save changes for Details?", true, "Yes", "No")
          .then((result) => {
            if (result) {
              this.saveAudit();
              resolve(false);
            }
            else {
              resolve(true);
            }
          }, error => reject(error));

      });

    }
    else {
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
          this.saveAudit();
          resolve(false);
        }
        else {
          resolve(true);
        }
      }, error => reject(error));
    });




  }
  show89() {
    this.showAbove89 = true;
    this.showAbove74 = false;
    this.showAbove50 = false;
    this.openList = false;
    this.closeList = false;
    this.evNotList = false;
    this.totalAudits = this.appAudit.auditsAbove89.length;
    this.showPagination = true;
  }

  show74() {
    this.showAbove89 = false;
    this.showAbove74 = true;
    this.showAbove50 = false;
    this.openList = false;
    this.closeList = false;
    this.evNotList = false;
    this.totalAudits = this.appAudit.auditsAbove74.length;
    this.showPagination = true;
  }

  show50() {
    this.showAbove89 = false;
    this.showAbove74 = false;
    this.showAbove50 = true;
    this.openList = false;
    this.closeList = false;
    this.evNotList = false;
    this.totalAudits = this.appAudit.auditsAbove50.length;
    this.showPagination = true;
  }


  showOpen() {
    this.showAbove89 = false;
    this.showAbove74 = false;
    this.showAbove50 = false;
    this.openList = true;
    this.closeList = false;
    this.evNotList = false;
    this.totalAudits = this.appAudit.openAuditPolicies.length;
    this.showPagination = true;
  }

  showClose() {
    this.showAbove89 = false;
    this.showAbove74 = false;
    this.showAbove50 = true;
    this.openList = false;
    this.closeList = true;
    this.evNotList = false;
    this.totalAudits = this.appAudit.closedAuditPolicies.length;
    this.showPagination = true;
  }

  showEvidenceNotSubmittedCount() {
    this.showAbove89 = false;
    this.showAbove74 = false;
    this.showAbove50 = true;
    this.openList = false;
    this.closeList = false;
    this.evNotList = true;
    this.totalAudits = this.appAudit.evnAuditPolicies.length;
    this.showPagination = true;
  }

  // get50Sort({ column, direction }: SortEvent) {
  //   if (this.appAudit.auditsAbove50 !== undefined && this.appAudit.auditsAbove50 !== null && this.appAudit.auditsAbove50.length > 0)
  //     this.headers.forEach(header => {
  //       if (header.sortable !== column) {
  //         header.direction = '';
  //       }
  //       else if (header.sortable === column && direction !== '') {
  //         this.appAudit.auditsAbove50 = this.toSorting(this.appAudit.auditsAbove50, column, direction);

  //       }
  //     });
  // }
  getSort({ column, direction }: SortEvent) {
    if (this.appAudit.auditsAbove50 !== undefined && this.appAudit.auditsAbove50 !== null && this.appAudit.auditsAbove50.length > 0)
      this.headers.forEach(header => {
        if (header.sortable !== column) {
          header.direction = '';
        }
        else if (header.sortable === column && direction !== '') {
          this.appAudit.auditsAbove50 = this.toSorting(this.appAudit.auditsAbove50, column, direction);

        }
      });
  }
 

  get74Sort({ column, direction }: SortEvent) {
    if (this.appAudit.auditsAbove74 !== undefined && this.appAudit.auditsAbove74 !== null && this.appAudit.auditsAbove74.length > 0)
      this.headers.forEach(header => {
        if (header.sortable !== column) {
          header.direction = '';
        }
        else if (header.sortable === column && direction !== '') {
          this.appAudit.auditsAbove74 = this.toSorting(this.appAudit.auditsAbove74, column, direction);

        }
      });
  }

  get89Sort({ column, direction }: SortEvent) {
    if (this.appAudit.auditsAbove89 !== undefined && this.appAudit.auditsAbove89 !== null && this.appAudit.auditsAbove89.length > 0)
      this.headers.forEach(header => {
        if (header.sortable !== column) {
          header.direction = '';
        }
        else if (header.sortable === column && direction !== '') {
          this.appAudit.auditsAbove89 = this.toSorting(this.appAudit.auditsAbove89, column, direction);

        }
      });
  }
  getOpenSort({ column, direction }: SortEvent)
  {
    if (this.appAudit.openAuditPolicies !== undefined && this.appAudit.openAuditPolicies !== null && this.appAudit.openAuditPolicies.length > 0)
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
      else if (header.sortable === column && direction !== '') {
        this.appAudit.openAuditPolicies = this.toSorting(this.appAudit.openAuditPolicies, column, direction);

      }
    });
  }

  getEVSort({ column, direction }: SortEvent)
  {
    if (this.appAudit.evnAuditPolicies !== undefined && this.appAudit.evnAuditPolicies !== null && this.appAudit.evnAuditPolicies.length > 0)
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
      else if (header.sortable === column && direction !== '') {
        this.appAudit.evnAuditPolicies = this.toSorting(this.appAudit.evnAuditPolicies, column, direction);

      }
    });
  }

  getCloseSort({ column, direction }: SortEvent)
  {
    if (this.appAudit.closedAuditPolicies !== undefined && this.appAudit.closedAuditPolicies !== null && this.appAudit.closedAuditPolicies.length > 0)
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
      else if (header.sortable === column && direction !== '') {
        this.appAudit.closedAuditPolicies = this.toSorting(this.appAudit.closedAuditPolicies, column, direction);

      }
    });
  }


  toSorting(countries: any[], column: string, direction: string): any[] {
    if (direction === '') {
      return countries;
    } else {
      return [...countries].sort((a, b) => {
        const res = this.compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  compare(v1: any, v2: any) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }
}
