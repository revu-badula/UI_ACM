import { Component, OnInit, ViewChild, ElementRef, TemplateRef, HostListener } from '@angular/core';
import { AppAuditPolicyDTO, Policy, PolicyDocumentsDTO } from '../appauditpolicydto';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { APP_CONFIG } from '../app.config';
import { ApiserviceService } from '../apiservice.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UtilService } from '../util.service';
import { Location } from '@angular/common';
import { DialogService } from '../dialog.service';
import { Cookie } from 'ng2-cookies';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-auditpolicyadd',
  templateUrl: './auditpolicyadd.component.html',
  styleUrls: ['./auditpolicyadd.component.css']
})
export class AuditpolicyaddComponent implements OnInit {
  @ViewChild('fileInput') inputEl: ElementRef;
  @ViewChild('content') content: TemplateRef<any>;
  @ViewChild('pol') pol: ElementRef;
  color: String;
  policyDocumentDTO: PolicyDocumentsDTO;
  files: File[] = [];
  public users:any;
  policyPost: AppAuditPolicyDTO
  public loading:boolean=false;
  public endDate: any;
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
    private activatedRoute: ActivatedRoute, private _apiservice: ApiserviceService, 
    private modalService: NgbModal, private router:Router) {

    this.policyPost = new AppAuditPolicyDTO();
   }

  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.getUsers();
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

  getEndDate(value)
  {
    if (value.formatted === "") {
      this.policyPost.endDate = null;
    }
    else {
      let d = value.formatted;

      let latest_date = this.datepipe.transform(d, 'yyyy-MM-dd');
      this.policyPost.endDate = moment(latest_date).format();
    }
  }

  addPolicy() {
    this.loading = true;
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.loading=true;
   let appParId=localStorage.getItem("appParentPolicyId")
    this.policyPost.appParentPolicyId = +appParId;
    this.policyPost.updatedBy=Cookie.get("userName");
    this.policyPost.assignedBy=Cookie.get("userName");
    this.policyPost.updatedBy=Cookie.get("userName");
    let url = APP_CONFIG.updateAppPolicy;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = JSON.stringify(this.policyPost);
    console.log(data);
    this.http.post(url, data, options).subscribe((data: any) => {
        this.loading=false;
        this.modalService.open(this.content, ngbModalOptions);
      }, error => { 
        this.loading=false;
        console.log(error) });
  }

  // createPolicyDocumentDTO(fileInput: any) {
  //   this.policyDocumentDTO = new PolicyDocumentsDTO();
  //   this.policyDocumentDTO.documentName = fileInput.target.files[0].name;
  //   this.policyDocumentDTO.activeFlag=true;
  //   this.files.push(fileInput.target.files[0]);

  //   if (this.policyPost.policyDocumentsDTOs == null) {
  //     this.policyPost.policyDocumentsDTOs = [] as PolicyDocumentsDTO[];
  //   }
  //   this.policyPost.policyDocumentsDTOs.push(this.policyDocumentDTO);
  //   this.inputEl.nativeElement.value="";

  // }



}
