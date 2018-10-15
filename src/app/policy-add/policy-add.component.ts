import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { Policy, PolicyDocumentsDTO, PolicyGrp } from '../data_modelPolicy';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { APP_CONFIG } from '../app.config';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';
import { UtilService } from '../util.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-policy-add',
  templateUrl: './policy-add.component.html',
  styleUrls: ['./policy-add.component.css'],
  providers: [ApiserviceService]
})

export class PolicyAddComponent implements OnInit {
  @ViewChild('fileInput') inputEl: ElementRef;
  @ViewChild('content') content: TemplateRef<any>;
  @ViewChild('pol') pol: ElementRef;
  color: String;
  policyUrlId: number;
  policyPost: Policy;
  policyDocumentDTO: PolicyDocumentsDTO;
  files: File[] = [];
  showDiv: boolean;
  displayField: number = 2;
  public definitive: boolean;
  public policy: boolean;
  public policyData: any;
  public auditTypes: any;
  public policyTypes: any;
  policies: Policy[];
  addNewPolicy: any = [];
  linkedPolicy: Policy;
  public loading:boolean=false;
  showLink: boolean = true;
  public links: any;
  public accountnum: any[] = [];
  public list: any;
  public other = [];
  public endDate: any;

  constructor(private router: Router,
    private http: Http, private modalService: NgbModal,
    private _apiservice: ApiserviceService, private _location: Location, 
    private utilService: UtilService) {
    this.policyPost = new Policy();
    this.policyPost.policyDocumentsDTOs = [] as PolicyDocumentsDTO[];
    this.files = [] as File[];
    this.policies = [];
    //this.linkedPolicy = new Policy();
  }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content);
  }
  getColor() {
    return this.color === 'online' ? '#ffffff' : 'white';
  }
  getOpacity() {
    return this.color === 'online' ? 0.8 : 1;
  }

  createPolicyDocumentDTO(fileInput: any) {
    this.policyDocumentDTO = new PolicyDocumentsDTO();
    this.policyDocumentDTO.documentName = fileInput.target.files[0].name;

    this.files.push(fileInput.target.files[0]);

    if (this.policyPost.policyDocumentsDTOs == null) {
      this.policyPost.policyDocumentsDTOs = [] as PolicyDocumentsDTO[];
    }
    this.policyPost.policyDocumentsDTOs.push(this.policyDocumentDTO);

  }

  dateSubmit() {
    let date = this.endDate.formatted;
    this.policyPost.endDate = Date.parse(date);
  }

  addPolicy() {
    this.loading=true;
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    let url = APP_CONFIG.savePolicy;
    this.policyPost.policyGrpId = UtilService.policyGrpId;
    var formData = new FormData();
    if (this.endDate != null) {
      this.dateSubmit();
    }

    formData.append('policy', JSON.stringify(this.policyPost));
    for (let i = 0; i < this.files.length; i++) {
      formData.append('files', this.files[i]);

    }
    this.http.post(url, formData).subscribe((data: any) => {
      this.loading=false;
      this.modalService.open(this.content,ngbModalOptions);
    }, error => {
      this.loading=false;
      console.log(error);
    });
  }

  changeDiv() {
    this.showDiv = true;
  }

  selectType(policy) {
    if (policy === 'Choose...') {
    this.policy = false;
    }
    else {
      this.policy = true;
    }
  }

  showDropdown() {

    this._apiservice.getAuditTypes()
      .subscribe((data: any) => {
        this.auditTypes = data;
      }, error => { console.log(error); });


  }

  selectDefinitive(auditID) {

    if (auditID === 'Choose...') {
      this.definitive = false
      this.policyTypes = [];
    }
    else {
      this.definitive = true;
      this._apiservice.getPolicyGroup(auditID)
        .subscribe((data: any) => {
          this.policyTypes = data;
        }, error => { console.log(error) });
    }



  }

  fetchPolicies(id) {
    this._apiservice.fetchPolicies(id)
      .subscribe((data: any) => {
        this.policies = data.policyDTOs;
      }, error => console.log(error));

  }

  viewEvent(addPolicies: any, event) {



    if (this.policyPost.linkedPolicies == null) {
      this.policyPost.linkedPolicies = [];
    }

    if (event) {
      addPolicies.linkType = 'ADD';
      addPolicies.status = true;
      this.policyPost.linkedPolicies.push(addPolicies);

    }
    else {

      var len = this.policyPost.linkedPolicies.length;

      for (let i = 0; i < len; i++) {
        if (this.policyPost.linkedPolicies[i].policyId == addPolicies.policyId) {
          this.policyPost.linkedPolicies.splice(i, 1);
          break;
        }

      }	//For end

    } // ELse end



  }

  checkEvent(event: any, ch: boolean) {

  }



  redirect() {
    UtilService.backClicked=true;
    this.router.navigate(['/policyView/policyDetails']);
  }



  saveLink() {



    this.showDiv = false;
    this.showLink = false;


    this.links = this.policyPost.linkedPolicies;

    for (let i = 0; i < this.links.length; i++) {
      this.other.push(this.links[i].controlNumber);

    }

  }

  radioValue(event: any) {
    //console.log(event);
    if (event.target.defaultValue === "Link from Internal") {
      this.displayField = 1;
    }
    else {
      this.displayField = 0;
    }
  }

  backClicked() {
    UtilService.backClicked = true;
    this._location.back();
  }

  goTo(event) {
    event.preventDefault();
    UtilService.backClicked = true;
    this.router.navigate(['/policyView/policyDetails']);
  }

}
