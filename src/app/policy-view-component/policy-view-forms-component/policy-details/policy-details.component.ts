import { Component, OnInit, ViewChild, ElementRef, TemplateRef, AfterViewInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { PolicyGrp, Policy, PolicyDocumentsDTO, PolicyReviewTerm } from '../../../data_modelPolicy';
import { familyPOlicyDTO } from '../../../data.model.auditDTO';
import { ApiserviceService } from '../../../apiservice.service';
import { IMyDate } from 'mydatepicker';
import { APP_CONFIG } from '../../../app.config';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { UtilService } from '../../../util.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { Cookie } from 'ng2-cookies';
import { DialogService } from '../../../dialog.service';

import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { Observable, Subject } from 'rxjs';



@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.css'],
  providers: [ApiserviceService]
})
export class PolicyDetailsComponent implements OnInit {
  @ViewChild('fileInput') inputEl: ElementRef;
  @ViewChild('content1') content1: TemplateRef<any>;
  policyDisplay: PolicyGrp;
  policies: Policy[];
  policyGrpData: PolicyGrp;
  policyFileobj: any;
  public showFamily: boolean = true;
  policyDocumentDTO: PolicyDocumentsDTO[];
  files: File[] = [];
  public users: any;
  plus = true;
  public families: any;


  public assignTo: any;
  public assignOn: any;
  public scoreN: any;
  public scoreD: any;
  public weightageN: any;
  public weightageD: any;
  public result: any;
  public realScore: any;


  family: familyPOlicyDTO;
  public changeOverallStatus: boolean = false;

  p: number = 1;
  config = {
    placeholder: '',
    tabsize: 2,
    height: 200,
    width: "100%",
    toolbar: [
      // [groupName, [list of button]]
      ['misc', ['undo', 'redo']],
      ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style0', 'ul', 'ol', 'paragraph', 'height']]
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times'],

  };
  showDocument: boolean;
  showForm: boolean = true;
  public policyDropDownId: number;
  public lastReviewDate: any;
  public displayLastReviewDate: IMyDate = null;
  public nextReviewDate: any;
  public displayNextReviewDate: IMyDate = null;
  public updatedAt: any;
  public displayUpdatedAt: IMyDate = null;
  public policyDocumentsSubmit: PolicyGrp;
  public desc1: boolean = false;
  public desc2: boolean = false;
  public desc3: boolean = false;
  public desc4: boolean = false;
  public desc5: boolean = false;
  public loading: boolean = false;
  public showDownload: boolean = false;
  public policyReviewTerm: any[] = [{ id: 1, reviewTerm: "Yearly" },
  { id: 2, reviewTerm: "Half-Yearly" },
  { id: 3, reviewTerm: "Quarterly" }];
  public policyObj: any;
  public policyReview: PolicyReviewTerm;

  constructor(private modalService: NgbModal, private _apiservice: ApiserviceService, private http: Http,
    private utilservice: UtilService, private activatedRoute: ActivatedRoute, private router: Router, private dialogService: DialogService, public datepipe: DatePipe, ) {
    this.policyDisplay = new PolicyGrp();
    this.policies = [];
    this.policyDocumentsSubmit = new PolicyGrp();
    this.policyGrpData = new PolicyGrp();
    this.policyDocumentDTO = [];
    this.files = [] as File[];
    this.policyReview = new PolicyReviewTerm();
    this.family = new familyPOlicyDTO();
    if (UtilService.review) {
      UtilService.review = false;
      this.router.navigate(['policyView/review']);
    }


  }

  open(content: any) {
    this.modalService.open(content);
  }

  show(control: any) {
    this.modalService.open(control);
  }

  changeButton() {
    this.plus = false;
    this.showForm = false;
    this.showFamily = false;
  }

  close() {
    this.plus = true;
    this.showForm = true;
    this.showFamily = true;
  }

  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    //this.fetchPolicies(UtilService.policyGrpId);
    this.fetchPolicies(+sessionStorage.getItem("policyGrpId"));
    this.policyDropDownId = UtilService.policyGrpId;
    //this.getFamilies(UtilService.policyGrpId);
    this.fetchPolicyFamily(+sessionStorage.getItem("policyGrpId"));
    this.getUsers();
  }


  fetchPolicies(id: any) {
    this.loading = true;
    this._apiservice.fetchPolicies(id)
      .subscribe((data: any) => {
        this.loading = false;
        this.policyDisplay = data.policyGrpDTO;
        this.policies = data.policyDTOs;
        if (data.policyDTOs != undefined && data.policyDTOs.length > 0) {
          this.showDownload = true;
        }
        this.policyGrpData = data.policyGrpDTO;
        let dt = new Date(this.policyGrpData.updatedTs);
        let month = dt.getMonth() + 1;
        let day = dt.getDate();
        let year = dt.getFullYear();
        this.updatedAt = month + "/" + day + "/" + year;
        let dUpdatedAt = new Date(this.policyDisplay.updatedTs);
        this.displayUpdatedAt = {
          year: dUpdatedAt.getFullYear(),
          month: dUpdatedAt.getMonth() + 1,
          day: dUpdatedAt.getDate()
        }
        if ((this.policyDisplay.lastReviewDate && this.policyDisplay.policyReviewDate) != null) {
          this.dateRetreive();
        }
      }, error => console.log(error));

  }

  displayReview(val) {

    this.policyDisplay.policyReviewTermId = val.target.value;
    this.policyDisplay.policyReviewTerm = val;
  }


  transferDocument() {
    this.showDocument = true;
  }

  downloadFile(id) {
    window.open(APP_CONFIG.generatePolicyFile + '?' + 'policyGrpId' + '=' + id);
  }

  createPolicyFile(fileInput: any) {

    this.files.push(fileInput.target.files[0]);


  }


  dateRetreive() {
    let d = new Date(this.policyDisplay.lastReviewDate);
    this.displayLastReviewDate = {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate()
    }
    let rd = new Date(this.policyDisplay.policyReviewDate);
    this.displayNextReviewDate = {
      year: rd.getFullYear(),
      month: rd.getMonth() + 1,
      day: rd.getDate()
    }
  }

  dateSubmit() {
    let date = this.lastReviewDate.formatted;
    this.policyDisplay.lastReviewDate = Date.parse(date);

    let reviewDate = this.nextReviewDate.formatted;
    this.policyDisplay.policyReviewDate = Date.parse(reviewDate);

  }

  updatePolicyGrp() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.policyDisplay.policyGrpId = UtilService.policyGrpId;
    if ((this.lastReviewDate && this.nextReviewDate) != null) {
      this.dateSubmit();
    }
    this.policyDisplay.updatedBy = Cookie.get("userName");
    this.policyObj = JSON.stringify(this.policyDisplay);
    let url = APP_CONFIG.updatePolicyGrp;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    this.loading = true;
    this.http.post(url, this.policyObj, options).subscribe((data: any) => {
      this.loading = false;
      this.modalService.open(this.content1, ngbModalOptions)

    }, error => {
      this.loading = false;
      console.log(error);
    });

  }

  uploadPolicyFile() {
    let url = APP_CONFIG.uploadPolicyFile;
    var policyDocumentsData = new FormData();
    for (let i = 0; i < this.files.length; i++) {
      policyDocumentsData.append('file', this.files[i]);
    }
    this.policyDocumentsSubmit.policyGrpId = UtilService.policyGrpId;
    this.policyDocumentsSubmit.createdBy = Cookie.get("userName");
    this.policyDocumentsSubmit.updatedBy = Cookie.get("userName");
    policyDocumentsData.append('policy', JSON.stringify(this.policyDocumentsSubmit));
    this.loading = true;
    this.http.post(url, policyDocumentsData)
      .map(res => res.json())
      .subscribe((data: any) => {
        this.loading = false;
        this.policies = data.policyDTOs;
      }, error => {
        this.loading = false;
        console.log(error);
      });
  }

  handleSort(value) {
    if (!this.desc1) {
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
      this.desc1 = true;
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
      this.desc1 = false;
    }


  }


  handleSort2(value) {
    if (!this.desc2) {
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
      this.desc2 = true;
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
      this.desc2 = false;
    }




  }
  handleSort3(value) {
    if (!this.desc3) {
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
      this.desc3 = true;
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
      this.desc3 = false;
    }


  }

  handleSort4(value) {
    if (!this.desc4) {
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
      this.desc4 = true;
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
      this.desc4 = false;
    }


  }

  handleSort5(value) {
    if (!this.desc5) {
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
      this.desc5 = true;
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
      this.desc5 = false;
    }




  }


  fetchPolicyFamily(id: any) {
    this.families = [];
    this._apiservice.fetchPolicyFamily(id)
      .subscribe((data: any) => {

        this.families = data;

        // if (data.length > 0) {
        //   this.families = [];
        //   for (let i = 0; i < data.length; i++) {
        //     this.families.push(data[i].familyName);
        //   }
        // }

      }, error => { console.log(error) });

  }

  getFamily(value: any) {

    this.family.policyFamilyID = null;
    if (value === "") {

    }
    else if (value === "all") {
      this.fetchPolicies(+sessionStorage.getItem("policyGrpId"));
    }
    else {
      this.family.policyFamilyID=+value;
      this.loading = true;
      let name:any;
      for(let i=0;i<this.families.length;i++)
      {
        if(this.families[i].policyFamilyID === +value){
        name=this.families[i].familyName;
        break;
        }
      }
      this._apiservice.getPoliciesByFam(name)
        .subscribe((data: any) => {
          this.loading = false;
          this.policies = data;
          //console.log(data);
        }, error => {
          this.loading = false;
          console.log(error)
        });
    }
  }

  getUsers() {
    this._apiservice.getUsers()
      .subscribe((data: any) => {
        this.users = data;

      }, error => console.log(error));

  }

  getDateAssign(value: any) {
    if (value.formatted === "") {
      this.family.assignedDt = null;
    }
    else {
      let d = value.formatted;
      let latest_date = this.datepipe.transform(d, 'yyyy-MM-dd');
      this.family.assignedDt = moment(latest_date).format();
    }
  }

  getNum() {

  }




  getDem() {

  }

  getRealScore() {


  }


  addStaff(value: any) {
    if (value >= 0 && value <= 100) {
      this.scoreN = value;
    }
    else if (value < 0) {
      this.scoreN = 0;
    }
    else {
      this.scoreN = 100;
    }

  }



  overridePolicyFamily() {
    this.loading = true;
    let url = APP_CONFIG.overridePolicyFamily;
    // this.family.policyFamilyID = +sessionStorage.getItem('policyFamilyID');
    let data = JSON.stringify(this.family);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    this.http.post(url, data, options)
      .subscribe((data: any) => {
        this.loading = false;
        this.dialogService.open("Info", "family has been updated.", false, "OK", "OK");
      }, error => {
        this.loading = false;
        console.log(error);
      })
  }


  getEvi(value: any) {
    if (value === 'true') {
      this.family.evidenceRequired = true;
    }
    else if (value === 'false') {
      this.family.evidenceRequired = false;

    }
  }


}
