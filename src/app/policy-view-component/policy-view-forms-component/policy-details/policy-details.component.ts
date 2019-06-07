import { Component, OnInit, ViewChild,ChangeDetectorRef, ElementRef, TemplateRef, AfterViewInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { PolicyGrp, Policy, PolicyDocumentsDTO, PolicyReviewTerm } from '../../../data_modelPolicy';
import { familyPOlicyDTO } from '../../../data.model.auditDTO';
import { ApiserviceService } from '../../../apiservice.service';
import { IMyDate } from 'mydatepicker';
import { APP_CONFIG } from '../../../app.config';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { UtilService } from '../../../util.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { DialogService } from '../../../dialog.service';
declare let tinymce: any;
import * as moment from 'moment';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.css'],
  providers: [ApiserviceService,DatePipe]
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
  public len: any = 0;
  public policyReviewTerm: any[] = [{ id: 1, reviewTerm: "Yearly" },
  { id: 2, reviewTerm: "Half-Yearly" },
  { id: 3, reviewTerm: "Quarterly" }];
  public policyObj: any;
  public policyReview: PolicyReviewTerm;
  config: any = {
    height: 250,
    width: 1080,
    theme: 'modern',
    plugins: 'textcolor wordcount colorpicker textpattern',
    toolbar: 'bold italic strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
    branding: false,
    menubar: false,
    statusbar: false
  };
  constructor(private modalService: NgbModal, private _apiservice: ApiserviceService, private http: Http,
    private utilservice: UtilService, private activatedRoute: ActivatedRoute,
     private router: Router, private dialogService: DialogService,
      public datepipe: DatePipe,private ref: ChangeDetectorRef) {
    this.policyDisplay = new PolicyGrp();
    this.policies = [];
    this.policyDocumentsSubmit = new PolicyGrp();
    this.policyGrpData = new PolicyGrp();
    this.policyDocumentDTO = [];
    this.files = [] as File[];
    this.policyReview = new PolicyReviewTerm();
    this.family = new familyPOlicyDTO();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.config.init_instance_callback = (editor: any) => {
      editor.on('keyup', () => {
        this.getData(editor);
      });
    };
    


  }


  getData(editor: any) {
    this.len = 0;
    if (tinymce.activeEditor.getContent({ format: 'text' }).length > 50000) {
      let len: any = tinymce.activeEditor.getContent({ format: 'text' }).length;
      let re = len - 50000;
      let data: any = tinymce.activeEditor.getContent({ format: 'text' });
      let dat = data.substring(0, 50000);
      tinymce.activeEditor.setContent('<div id="idTextPanel" class="jqDnR" style="margin: 0px; padding: 0px; position: relative; color: #666666; font-family: Verdana, Geneva, Helvetica, sans-serif; font-size: 11px;"><p style="margin: 0px 0px 10px; padding: 0px; line-height: normal; font-family: Verdana, Geneva, sans-serif; font-size: 10px;">' + dat + '</p></div>');
      this.ref.detectChanges();
    }
    else if (tinymce.activeEditor.getContent() === "") {
      this.len = 0;
      this.ref.detectChanges();
    }
    else {
      this.len = tinymce.activeEditor.getContent({ format: 'text' }).length;
      this.ref.detectChanges();
    }
  };

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
    this.policyDropDownId = UtilService.policyGrpId;
    this.fetchPolicyFamily(+sessionStorage.getItem("policyGrpId"));
    this.getUsers();
  }


  fetchPolicies(id: any) {
    this.loading = true;
    this._apiservice.fetchPolicies(id)
      .subscribe((data: any) => {
        this.loading = false;
        this.policyDisplay = data.policyGrpDTO;
        if(this.policyDisplay.description != undefined){
          let des = this.policyDisplay.description.replace(/<[^>]+>/gm, '');
          this.len = des.length;
        }
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
      }, error => {
        this.loading = false;
        console.log(error);
      }
      );

  }

  displayReview(val:any) {

    //this.policyDisplay.policyReviewTermId = val;
    this.policyDisplay.policyReviewTerm = val;
  }


  transferDocument() {
    this.showDocument = true;
  }

  downloadFile(id:any) {
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
      this.family.policyFamilyID = +value;
      this.loading = true;
      let name: any;
      for (let i = 0; i < this.families.length; i++) {
        if (this.families[i].policyFamilyID === +value) {
          name = this.families[i].familyName;
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

  toggle() {
    this.showN = !this.showN;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.showN)
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }


}
