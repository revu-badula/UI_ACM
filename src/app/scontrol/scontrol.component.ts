import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef, TemplateRef, AfterViewInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { PolicyGrp, Policy, PolicyDocumentsDTO, PolicyReviewTerm } from '../data_modelPolicy';
import { familyPOlicyDTO } from '../data.model.auditDTO';
import { ApiserviceService } from '../apiservice.service';
import { IMyDate } from 'mydatepicker';
import { APP_CONFIG } from '../app.config';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { UtilService } from '../util.service';
import { ActivatedRoute, Params, Router,NavigationEnd } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { DialogService } from '../dialog.service';
declare let tinymce: any;
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-scontrol',
  templateUrl: './scontrol.component.html',
  styleUrls: ['./scontrol.component.css']
})
export class ScontrolComponent implements OnInit {

  @ViewChild('fileInput') inputEl: ElementRef;
  @ViewChild('content1') content1: TemplateRef<any>;
  policyDisplay: PolicyGrp;
  policies: Policy[];
  policyGrpData: PolicyGrp;
  public showFamily: boolean = true;
  public users: any;
  public plus: boolean = true;
  public families: any;
  public showN: boolean = false;
  public buttonName: any = 'Show';
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
  showDocument: boolean;
  showForm: boolean = true;
  public desc1: boolean = false;
  public desc2: boolean = false;
  public desc3: boolean = false;
  public desc4: boolean = false;
  public desc5: boolean = false;
  public loading: boolean = false;
  public showDownload: boolean = false;
  public len: any = 0;
  public policyFamilyID: any;

  constructor(private modalService: NgbModal, private _apiservice: ApiserviceService, private http: Http,
    private utilservice: UtilService,
    private router: Router, private dialogService: DialogService,
    public datepipe: DatePipe, private route: ActivatedRoute) {
    this.policies = [];
    this.family = new familyPOlicyDTO();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.route.params.subscribe(params => {
      this.policyFamilyID = params['id'];
    });
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
    this.fetchPolicies(+sessionStorage.getItem("policyGrpId"));
    this.fetchPolicyFamily(+sessionStorage.getItem("policyGrpId"));
  }


  fetchPolicies(id: any) {
    this.loading = true;
    this._apiservice.fetchPolicies(id)
      .subscribe((data: any) => {
        this.loading = false;
        this.policyDisplay = data.policyGrpDTO;
        this.policyGrpData = data.policyGrpDTO;
      }, error => {
        this.loading = false;
        console.log(error);
      }
      );

  }

  displayReview(val: any) {
    this.policyDisplay.policyReviewTerm = val;
  }


  transferDocument() {
    this.showDocument = true;
  }

  downloadFile(id: any) {
    window.open(APP_CONFIG.generatePolicyFile + '?' + 'policyGrpId' + '=' + id);
  }



  handleSort(value: any) {
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


  handleSort2(value: any) {
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
  handleSort3(value: any) {
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

  handleSort4(value: any) {
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

  handleSort5(value: any) {
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
        this.getFamily(this.policyFamilyID);


      }, error => { console.log(error) });

  }

  getFamily(value: any) {
    this.family.policyFamilyID = +value;
    this.loading = true;
    let name: any;
    for (let i = 0; i < this.families.length; i++) {
      if (this.families[i].policyFamilyID === +value) {
        name = this.families[i].familyName;
        this.family = this.families[i];
        if(this.family.assignedDt !== undefined && this.family !== null)
        {
          let rd = new Date(this.family.assignedDt);
          let year = rd.getFullYear();
          let month = rd.getMonth() + 1;
          let day = rd.getDate();
          this.assignOn = { date: { month: month, day: day, year: year } };
        }
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

  toggle() {
    this.showN = !this.showN;
    if (this.showN)
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }


}
