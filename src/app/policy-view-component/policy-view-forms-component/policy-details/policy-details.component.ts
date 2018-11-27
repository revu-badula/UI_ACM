import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PolicyGrp, Policy, PolicyDocumentsDTO, PolicyReviewTerm } from '../../../data_modelPolicy';
import { ApiserviceService } from '../../../apiservice.service';
import { IMyDate } from 'mydatepicker';
import { APP_CONFIG } from '../../../app.config';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { UtilService } from '../../../util.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';


@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.css'],
  providers: [ApiserviceService]
})
export class PolicyDetailsComponent implements OnInit {
  @ViewChild('fileInput') inputEl: ElementRef;
  policyDisplay: PolicyGrp;
  policies: Policy[];
  policyGrpData: PolicyGrp;
  policyFileobj: any;
  policyDocumentDTO: PolicyDocumentsDTO[];
  files: File[] = [];
  plus = true;
  public families: any;
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
  public policyReviewTerm: any[] = [{ id: 1, reviewTerm: "Yearly" },
  { id: 2, reviewTerm: "Half-Yearly" },
  { id: 3, reviewTerm: "Quarterly" }];
  public policyObj: any;
  public policyReview: PolicyReviewTerm;

  constructor(private modalService: NgbModal, private _apiservice: ApiserviceService, private http: Http,
    private utilservice: UtilService, private activatedRoute: ActivatedRoute) {
    this.policyDisplay = new PolicyGrp();
    this.policies = [];
    this.policyDocumentsSubmit = new PolicyGrp();
    this.policyGrpData = new PolicyGrp();
    this.policyDocumentDTO = [];
    this.files = [] as File[];
    this.policyReview = new PolicyReviewTerm();
    if (UtilService.backClicked) {
      UtilService.backClicked = false;
      this.fetchPolicies(UtilService.policyGrpId);

    }
  }

  open(content) {
    this.modalService.open(content);
  }

  show(control) {
    this.modalService.open(control);
  }

  changeButton() {
    this.plus = false;
    this.showForm = false;
  }

  close() {
    this.plus = true;
  }

  ngOnInit() {
    this.fetchPolicies(UtilService.policyGrpId);
    this.policyDropDownId = UtilService.policyGrpId;
    this.getFamilies(UtilService.policyGrpId);
  }

  fetchPolicies(id) {
    this.loading = true;
    this._apiservice.fetchPolicies(id)
      .subscribe((data: any) => {
        this.loading = false;
        this.policyDisplay = data.policyGrpDTO;
        this.policies = data.policyDTOs;
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
    this.policyDisplay.policyReviewTerm = val.target.options[val.target.selectedIndex].text;
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
    this.policyDisplay.policyGrpId = UtilService.policyGrpId;
    if ((this.lastReviewDate && this.nextReviewDate) != null) {
      this.dateSubmit();
    }

    this.policyObj = JSON.stringify(this.policyDisplay);
    let url = APP_CONFIG.updatePolicyGrp;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    this.http.post(url, this.policyObj, options).subscribe((data: any) => {
    }, error => console.log(error));

  }

  uploadPolicyFile() {
    let url = APP_CONFIG.uploadPolicyFile;
    var policyDocumentsData = new FormData();
    for (let i = 0; i < this.files.length; i++) {
      policyDocumentsData.append('file', this.files[i]);
    }
    this.policyDocumentsSubmit.policyGrpId = UtilService.policyGrpId;
    this.policyDocumentsSubmit.createdBy = "testing";
    this.policyDocumentsSubmit.updatedBy = "testing";
    policyDocumentsData.append('policy', JSON.stringify(this.policyDocumentsSubmit));
    this.http.post(url, policyDocumentsData).subscribe((data: any) => {
    }, error => console.log(error));
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


  getFamilies(id) {
    this.families = [];
    this._apiservice.getFamilies(id)
      .subscribe((data: any) => {
        // data.forEach(contact => {
        // this.families.push(contact);
        // console.log(this.families);
        //});
        this.families = data;
      }, error => { console.log(error) });

  }

  getFamily(value) {

    //console.log(value);
    if (value === "") {

    }
    else {
      this.loading = true;
      this._apiservice.getPoliciesByFam(value)
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




}
