import { Component, OnInit, HostListener, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { Policy, PolicyDocumentsDTO, PolicyGrp } from '../data_modelPolicy';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { APP_CONFIG } from '../app.config';
import { IMyDate } from 'mydatepicker';
import { UtilService } from '../util.service';
declare var swal: any; ''
@Component({
  selector: 'app-control-name',
  templateUrl: './control-name.component.html',
  styleUrls: ['./control-name.component.css'],
  providers: [ApiserviceService],
})
export class ControlNameComponent implements OnInit {
  @ViewChild('fileInput') inputEl: ElementRef;

  @ViewChild('pol') pol: ElementRef;
  color: String;
  policyUrlId: any;
  policyAccess: Policy;
  showForm: boolean = true;
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
  showLink: boolean = true;
  public links: any;
  public showBt: boolean = false;
  public accountnum: any[] = [];
  public list: any;
  public p: number = 1;
  public other = [];
  public loading: boolean = false;
  public displayPolicyDocuments: any;
  public endDate: any;
  public subPolicyDTOs: any;
  public displayEndDate: IMyDate = null;
  public showFrm: boolean = true;
  public showDef: boolean = false;
  public showEli: boolean = true;
  public desc = false;
  @ViewChild('content') content: TemplateRef<any>;
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
  constructor(private _location: Location, private activatedRoute: ActivatedRoute,
    private _apiservice: ApiserviceService,
    private http: Http, private modalService: NgbModal,
    private utilService: UtilService, private router: Router) {
    this.policyAccess = new Policy();
    this.policyAccess.policyDocumentsDTOs = [] as PolicyDocumentsDTO[];
    this.files = [] as File[];
    this.policies = [];
    localStorage.removeItem('policyId');
    localStorage.removeItem('subPol');
    //this.linkedPolicy = new Policy();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.policyUrlId = params['id'];
      this.policyAccess.policyId = params['id'];
    });
    this.getPolicy(this.policyUrlId);
    this.showDropdown();
    this.fetchPolicies(1);

  }

  backClicked() {
    UtilService.backClicked = true;
    this._location.back();
  }

  getPolicy(id) {
    this.loading=true;
    this._apiservice.getPolicy(id)
      .subscribe((data: any) => {
        this.loading = false;
        this.policyAccess = data;
        this.policyAccess.policyDocumentsDTOs = data.policyDocumentsDTOs;
        this.subPolicyDTOs = data.subPolicyDTOs;
        if (this.policyAccess.endDate != null) {
          this.dateRetreive();
        }
      },error =>{
        this.loading=false;
        console.log(error);
      });
  }

  editorGroup(): void {
    this.showForm = false;
    this.showFrm = false;
    this.showEli = false;
  }

  open(content) {
    this.modalService.open(content);
  }

  createPolicyDocumentDTO(fileInput: any) {
    //this.policyDocumentDTO.activeFlag = true;
    this.policyDocumentDTO = new PolicyDocumentsDTO();
    this.policyDocumentDTO.documentName = fileInput.target.files[0].name;
    this.policyDocumentDTO.activeFlag = true;
    this.files.push(fileInput.target.files[0]);
    if (this.policyAccess.policyDocumentsDTOs == null) {

      this.policyAccess.policyDocumentsDTOs = [] as PolicyDocumentsDTO[];
    }
    this.policyAccess.policyDocumentsDTOs.push(this.policyDocumentDTO);
  }

  deleteFile(id, index) {
    this.confirm('Are You Sure?', 'delete the file', 'YES', 'NO')
      .then((result: any) => {
        if (result.value !== undefined && result.value) {
          if (id === undefined) {
            let length = this.policyAccess.policyDocumentsDTOs.length;
            if (length === 1) {
              this.policyAccess.policyDocumentsDTOs = []; //a,b,c,d,f = [2] =[3]
            }
            else {
              for (let i = index; i < length; i++) {
                this.policyAccess.policyDocumentsDTOs[i] = this.policyAccess.policyDocumentsDTOs[i + 1];
              }
              this.policyAccess.policyDocumentsDTOs.splice(length - 1, 1);
            }

          }
          else {
            for (let i = 0; i < this.policyAccess.policyDocumentsDTOs.length; i++) {
              if (this.policyAccess.policyDocumentsDTOs[i].policyDocId === id) {
                this.policyAccess.policyDocumentsDTOs[i].activeFlag = false;
              }
            }
          }

        }
      }, error => {
        console.log(error);
      });
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








  goToSubControl() {
    localStorage.setItem('policyId', this.policyUrlId);
    this.router.navigate(['/subcontrol']);

  }


  dateSubmit() {
    let date = this.endDate.formatted;
    this.policyAccess.endDate = Date.parse(date);
  }

  dateRetreive() {
    let d = new Date(this.policyAccess.endDate);
    this.displayEndDate = {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate()
    }
  }

  addPolicy() {
    this.loading=true;
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    let url = APP_CONFIG.updatePolicy;
    var formData = new FormData();
    if (this.endDate != null) {
      this.dateSubmit();
    }
    formData.append('policy', JSON.stringify(this.policyAccess));
    for (let i = 0; i < this.files.length; i++) {
      formData.append('files', this.files[i]);
    }
    this.http.post(url, formData).subscribe((data: any) => {
      this.loading = false;
      this.modalService.open(this.content, ngbModalOptions);
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



    if (this.policyAccess.linkedPolicies == null) {
      this.policyAccess.linkedPolicies = [];
    }

    if (event) {
      addPolicies.linkType = 'ADD';
      addPolicies.status = true;
      this.policyAccess.linkedPolicies.push(addPolicies);
    }
    else {

      var len = this.policyAccess.linkedPolicies.length;

      for (let i = 0; i < len; i++) {
        if (this.policyAccess.linkedPolicies[i].policyId == addPolicies.policyId) {
          this.policyAccess.linkedPolicies.splice(i, 1);
          break;
        }

      }	//For end

    } // ELse end


    //console.log(this.addNewPolicy);
    //this.policyAccess.linkedPolicies.push(this.addNewPolicy);
    //this.addNewPolicy = [];

  }

  checkEvent(event: any, ch: boolean) {
  }

  saveLink() {



    this.showDiv = false;
    this.showLink = false;
    this.links = this.policyAccess.linkedPolicies;

    for (let i = 0; i < this.links.length; i++) {
      this.other.push(this.links[i].controlNumber);

    }










  }

  /*addPolicy(){
  	let url = APP_CONFIG.updatePolicy;
  	var formData = new FormData();
  	formData.append('addLinkedPolicy', JSON.stringify(this.linkedPolicy));
  	console.log(formData.get('addLinkedPolicy'));
  	 this.http.post(url, formData).subscribe((data: any) => {
              console.log(data);
            }, error => console.log(error));
  }*/

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


  getPolicyDocumentAttch(id) {
    window.open(APP_CONFIG.getPolicyDocumentAttch + '?' + 'policyDocId' + '=' + id)
  }







  confirm(title = 'Are you sure?', text, confirmButtonText, cancelButtonText, showCancelButton = true) {
    return new Promise((resolve, reject) => {
      swal({
        title: title,
        text: text,
        type: 'warning',
        showCancelButton: showCancelButton,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        resolve(result);
      }, error => reject(error));
    });




  }
















  radioValue(event: any) {
    //console.log(event);
    if (event.target.defaultValue === "Link from Internal") {
      this.displayField = 1;
      this.showDef = true;
      this.showBt = true;
    }
    else {
      this.definitive = false;
      this.policy = false;
      this.showDef = false;
      this.showBt = false;
      this.displayField = 0;

    }
  }

  goTo(event) {
    event.preventDefault();
    UtilService.backClicked = true;
    this.router.navigate(['/policyView/policyDetails'])
  }

  getSubpolicy(id) {
    localStorage.setItem('policyId', this.policyUrlId);
    localStorage.setItem('subPol', id);
    this.router.navigate(['/subcontrol'])
  }


}
