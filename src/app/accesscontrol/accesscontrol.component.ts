import { Component, OnInit, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { AppAuditPolicyDTO, Policy, PolicyDocumentsDTO } from '../appauditpolicydto';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { APP_CONFIG } from '../app.config';
import { ApiserviceService } from '../apiservice.service';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
@Component({
  selector: 'app-accesscontrol',
  templateUrl: './accesscontrol.component.html',
  styleUrls: ['./accesscontrol.component.css'],
  providers: [ApiserviceService],
})
export class AccesscontrolComponent implements OnInit {
  color: String;
  public loading: boolean = false;
  @ViewChild('content') content: TemplateRef<any>;
  policyAccess: Policy;
  appPolicy: AppAuditPolicyDTO
  public users: any;
  showForm: boolean = true;
  public endDate: any;
  public showEli: boolean = true;
  policyDocumentDTO: PolicyDocumentsDTO;
  public appAuditPolicyId: any;
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
  constructor(private _location: Location,private http: Http, private datepipe: DatePipe,
    private activatedRoute: ActivatedRoute, private _apiservice: ApiserviceService, private modalService: NgbModal) {
    this.policyAccess = new Policy();
    this.appPolicy = new AppAuditPolicyDTO();
    this.policyDocumentDTO = new PolicyDocumentsDTO();
  }

  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    this.activatedRoute.params.subscribe(params => {
      this.appAuditPolicyId = params['id'];
      //this.policyAccess.policyId = params['id'];
    });
    this.getUsers();
    this.getPolicy(this.appAuditPolicyId)
  }

  backClicked() {
    this._location.back();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {

    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 100) {
      this.color = 'online';
    } else {
      this.color = 'offline';
    }

  }

  getColor() {
    // return this.color === 'online' ? '#ffffff' : 'white';
  }

  getOpacity() {
    // return this.color === 'online' ? 0.8 : 1;
  }

  getUsers() {
    this._apiservice.getUsers()
      .subscribe((data: any) => {
        this.users = data;

      }, error => console.log(error));

  }

  editorGroup(): void {
    this.showForm = false;
    this.showEli = false;
  }

  getPolicy(id) {
    this.loading = true;
    this._apiservice.getAppPolicies(id)
      .subscribe((data: any) => {
        this.loading = false;
        this.policyAccess = data.policyDTO;
        this.appPolicy = data;
      }, error => {
        this.loading = false;
        console.log(error);
      })
  }

  getEndDate(value)
  {
    if (value.formatted === "") {
      this.policyAccess.endDate = null;
    }
    else {
      let d = value.formatted;

      let latest_date = this.datepipe.transform(d, 'yyyy-MM-dd');
      this.policyAccess.endDate = moment(latest_date).format();
    }
  }

  addAppPolicy() {
    this.loading = true;
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    console.log(this.appPolicy);
    this.loading=true;
    this.appPolicy.updatedBy=Cookie.get("userName");
    this.policyAccess.updatedBy=Cookie.get("userName");
    let url = APP_CONFIG.updateAppPolicy;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = JSON.stringify(this.appPolicy);
    this.http.post(url, data, options).subscribe((data: any) => {
        this.loading=false;
        this.modalService.open(this.content, ngbModalOptions);
      }, error => { 
        this.loading=false;
        console.log(error) });
  }

  getPolicyDocumentAttch(id) {
    window.open(APP_CONFIG.getPolicyDocumentAttch + '?' + 'policyDocId' + '=' + id)
  }

  // createPolicyDocumentDTO(fileInput: any) {
  //   //this.policyDocumentDTO.activeFlag = true;
  //   this.policyDocumentDTO = new PolicyDocumentsDTO();
  //   this.policyDocumentDTO.documentName = fileInput.target.files[0].name;
  //   this.policyDocumentDTO.activeFlag = true;
  //   this.files.push(fileInput.target.files[0]);
  //   if (this.policyAccess.policyDocumentsDTOs == null) {

  //     this.policyAccess.policyDocumentsDTOs = [] as PolicyDocumentsDTO[];
  //   }
  //   this.policyAccess.policyDocumentsDTOs.push(this.policyDocumentDTO);
  //   this.inputEl.nativeElement.value="";
  // }




}
