import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Review } from '../../../review_DataModel';
import { ApiserviceService } from '../../../apiservice.service';
import { APP_CONFIG } from '../../../app.config';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IMyDpOptions, IMyDate } from 'mydatepicker';
import { UtilService } from '../../../util.service';
import { FilterPipe } from '../../../convertDate.pipe';
import { Router, ActivatedRoute } from '@angular/router';
import { PolicyGrp, Policy, PolicyDocumentsDTO, policyRevieDTO } from '../../../data_modelPolicy';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DialogService } from 'app/dialog.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @ViewChild('form') popUpForm: NgForm;
  @ViewChild('content') content: TemplateRef<any>;

  plus = true;
  review: Review[];
  assignTo: string;
  reviewDueDate: any;
  policyGrpId: number;
  reviewData = [];
  addArray = [];
  public reviewForm: FormGroup;
  firstName: string;
  dueDate: any;
  public users: any;
  public reviewDTO: policyRevieDTO;
  public policyData: any;
  public desc = false;
  public desc2 = false;
  public desc3 = false;
  public desc4 = false;
  public desc5 = false;
  public loading: boolean = false;
  public showDetails: boolean;
  public policies: Policy[];
  public showPolicy: boolean;
  public displayDueDate: IMyDate = null;
  public pId: number;
  policyAccess: Policy;
  public displayPolicyDocuments: any;
  public displayEndDate: IMyDate = null;
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd'
  };
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
  constructor(private modalService: NgbModal, private _apiservice: ApiserviceService,
     private http: Http, private fb: FormBuilder, private utilservice: UtilService, 
     private router: Router, private route: ActivatedRoute, 
     private datepipe: DatePipe, private httpClient:HttpClient, private dialogService: DialogService) {
    //this.review = new Review();
    this.review = [];
    this.policies = [];
    this.policyAccess = new Policy();
    this.reviewDTO = new policyRevieDTO();
  }

  ngOnInit() {
    //this.getUseronName("Harish");
    this.createForm();
    this.getUsers();
    //this.fetchPolicies(UtilService.policyGrpId);
    this.fetchPolicies(+sessionStorage.getItem("policyGrpId"));
    this.loading = true;
    //this.getPolicyReviewDetails(UtilService.policyGrpId);
  }

  open(content:any) {
    this.addArray = [];
    this.review = [];
    this.modalService.open(content);
    //this.plus=false;
  }

  updateReview()
  {
    //console.log(this.reviewDTO);
    this.loading=true;
    let url= APP_CONFIG.savePolicyReview;
    // let data = JSON.stringify(this.reviewDTO);
    this.httpClient.post(url,this.reviewDTO)
    .subscribe((data:any) => {
      this.loading=false;
      this.dialogService.open("Info","review Section has been updated.",false,"OK","OK");
    },error => {
      this.loading=false;
      console.log(error);
    })

  }




  changeButton() {
    this.plus = false;
  }

  data(value) {
    this.createForm();
    this.assignTo = value.firstName;
    let latest_date = this.datepipe.transform(value.dueDate.formatted, 'yyyy-MM-dd');
    this.reviewDueDate = moment(latest_date).format();
    let tabarray = {

      assignedTo: this.assignTo,
      dueDate: this.reviewDueDate,
      status: value.status,
      policyGrpId: UtilService.policyGrpId
    }
    let tabarray1 = {

      assignedTo: this.assignTo,
      dueDate: value.dueDate.formatted,
      status: value.status,
      policyGrpId: UtilService.policyGrpId
    }
    this.reviewData.push(tabarray);
    this.addArray.push(tabarray1);
    for (let i = 0; i < this.reviewData.length; i++) {
      this.review.push(this.reviewData[i]);
      this.reviewData = [];

    }

  }

  createForm() {
    this.reviewForm = this.fb.group({
      firstName: ['', Validators.required],
      dueDate: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  displayReviewDetails(id) {

    this.getPolicyReviewDetails(id)
  }

  displayPolicy(policy: number) {
    // this.showPolicy = true;
    // this.pId = policy;
    // this.getPolicy(this.pId);
    let url = "policyreviewview"+"/"+policy;
    this.router.navigateByUrl(url);
  }

  onSubmit() {
  }


  getUsers() {
    this._apiservice.getUsers()
      .subscribe((data: any) => {
        this.users = data;

      }, error => console.log(error));

  }

  getUseronName(name) {
    this._apiservice.getUseronName(name)
      .subscribe((data: any) => {


      });

  }

  fetchPolicies(id) {
    this.loading=true;
    this._apiservice.fetchPolicies(id)
      .subscribe((data: any) => {
        this.loading = false;
        this.policyData = data.policyReviewDTOs;
        this.policies = data.policyDTOs;
      },error => {
        this.loading = false;
        console.log(error);
      });

  }


  showPopup() {
    this.addArray = [];
    this.review = [];
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(this.content, ngbModalOptions);
  }

  dateRetreive() {
    let d = new Date(this.policyAccess.endDate);
    this.displayEndDate = {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate()
    }
  }

  getPolicy(id) {
    this._apiservice.getPolicy(id)
      .subscribe((data: any) => {
        this.loading = false;
        this.policyAccess = data;
        this.displayPolicyDocuments = data.policyDocumentsDTOs;
        if (this.policyAccess.endDate != null) {
          this.dateRetreive();
        }

      });
  }

  postReview() {
    this.loading=true;
    let url = APP_CONFIG.assignReviewers;
    this._apiservice.assignReviewers(this.review)
      .subscribe((data: any) => {
        this.loading=false;
        this.fetchPolicies(UtilService.policyGrpId);
      
      }, error => {
        this.loading=false;
        console.log(error)
      });
  }

  getPolicyReviewDetails(id) {
    this.loading = true;
    this._apiservice.getPolicyReviewDetails(id)
      .subscribe((data: any) => {
        this.showDetails = true;
        this.loading = false;
        this.reviewDTO = data.policyReviewDTO;
        let d = new Date(this.reviewDTO.dueDate);
        this.dueDate = {
          date: {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate()
          }
        }


      }, error => {
        this.loading = false;
        console.log(error);

      });

  }

  handleSort(value) {
    if (!this.desc) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.policyData.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.desc = true;
    }
    else {
      let orderByValue = value;
      this.policyData.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.desc = false;
    }


  }

  handleSort2(value) {
    if (!this.desc2) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.policyData.sort((a: any, b: any) => {
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
      this.policyData.sort((a: any, b: any) => {
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
      this.policyData.sort((a: any, b: any) => {
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
      this.policyData.sort((a: any, b: any) => {
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
      this.policyData.sort((a: any, b: any) => {
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
      this.policyData.sort((a: any, b: any) => {
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
      this.policyData.sort((a: any, b: any) => {
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
      this.policyData.sort((a: any, b: any) => {
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


}
