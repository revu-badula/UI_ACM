import { Component, OnInit, ViewChild, TemplateRef, HostListener, ElementRef } from '@angular/core';
import { ApiserviceService } from 'app/apiservice.service';
import { Policy, PolicyDocumentsDTO, PolicyGrp, subControl } from '../../data_modelPolicy';
import { APP_CONFIG } from '../../app.config';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { Cookie } from 'ng2-cookies';
import { DialogService } from '../../dialog.service';
import { UtilService } from '../../util.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-sub-control-name',
  templateUrl: './sub-control-name.component.html',
  styleUrls: ['./sub-control-name.component.css']
})
export class SubControlNameComponent implements OnInit {


  @ViewChild('fileInput') inputEl: ElementRef;

  @ViewChild('pol') pol: ElementRef;
  color: String;
  policyUrlId: any;
  policyAccess: Policy;
  showForm: boolean = true;
  policyDocumentDTO: PolicyDocumentsDTO;
  files: File[] = [];
  showDiv: boolean;
  public users: any;
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
    private utilService: UtilService, private router: Router, private dialogService: DialogService
    , private datepipe: DatePipe) {
    this.policyAccess = new Policy();
    this.policyAccess.policyDocumentsDTOs = [] as PolicyDocumentsDTO[];
    this.files = [] as File[];
    this.policies = [];
    //this.linkedPolicy = new Policy();
  }

  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    // this.activatedRoute.params.subscribe(params => {
    //   this.policyUrlId = params['id'];
    //   this.policyAccess.policyId = params['id'];
    // });
    this.getPolicy();
    this.showDropdown();
    this.fetchPolicies(1);
    this.getUsers();

  }

  backClicked() {
    //UtilService.backClicked = true;
    this._location.back();
  }

  // getPolicy() {
  //   this.loading = true;
  //   this._apiservice.getPolicy(id)
  //     .subscribe((data: any) => {
  //       this.loading = false;
  //       this.policyAccess = data;
  //       //console.log(this.policyAccess.linkedPolicies);
  //       //this.policyAccess.policyDocumentsDTOs = data.policyDocumentsDTOs;
  //       //this.subPolicyDTOs = data.subPolicyDTOs;
  //       // if (this.policyAccess.endDate != null) {
  //       //   this.dateRetreive();
  //       // }

  //       if (this.policyAccess.endDate === null) {
  //         this.endDate = { date: null };
  //       }
  //       else {
  //         let d = new Date(this.policyAccess.endDate);
  //         let day = d.getDate();
  //         let month = d.getMonth() + 1;
  //         let year = d.getFullYear();
  //         this.endDate = { date: { year: year, month: month, day: day } };
  //       }
  //     }, error => {
  //       this.loading = false;
  //       console.log(error);
  //     });
  // }



  getPolicy() {
    //this.loading = true;
    let polId = localStorage.getItem('policyId');
    let poId = +polId;
    // this._apiservice.getPolicy(poId)
    //   .subscribe((data: any) => {
    //     this.loading = false;
    this.showInfo(poId);

    //   }, error => {
    //     this.loading = false;
    //     console.log(error);
    //   });
    //this.subControl1.parentPolicyId=poId;
  }
  showInfo(value) {
    if (localStorage.getItem('subPol') === null) {
      this.policyAccess.parentPolicyId = value;
    }
    else {
      //this.showBtt = true;
      this.showForm = true;
      //this.showClose = true;
      let id = localStorage.getItem('subPol');
      let poId = +id;
      this.policyAccess.parentPolicyId = value;
      //this.policyAccess.policyId = poId;
      this.loading = true;
      this._apiservice.getPolicy(id)
        .subscribe((data: any) => {
          this.loading = false;
          this.policyAccess = data;
          if (this.policyAccess.endDate === null) {
            this.endDate = { date: null };
          }
          else {
            let d = new Date(this.policyAccess.endDate);
            let day = d.getDate();
            let month = d.getMonth() + 1;
            let year = d.getFullYear();
            this.endDate = { date: { year: year, month: month, day: day } };
          }
        }, error => {
          this.loading = false;
          console.log(error);
        })



    }
    // })
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
    this.inputEl.nativeElement.value = "";
  }

  deleteFile(id, index) {
    //this.confirm('Are You Sure?', 'delete the file', 'YES', 'NO')
    this.dialogService.open("Info", "Do you want to delete the file?", true, "Yes", "No")
      .then((result: any) => {
        if (result) {
          if (id === undefined) {
            let length = this.policyAccess.policyDocumentsDTOs.length;
            if (length === 1) {
              this.policyAccess.policyDocumentsDTOs = []; //a,b,c,d,f = [2] =[3]
            }
            else {
              for (let j = 0; j < this.files.length; j++) {
                if (this.files[j].name === this.policyAccess.policyDocumentsDTOs[index].documentName) {
                  this.files.splice(j, 1);
                }
              }
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

  getEndDate(value) {
    if (value.formatted === "") {
      this.policyAccess.endDate = null;
    }
    else {
      let d = value.formatted;

      let latest_date = this.datepipe.transform(d, 'yyyy-MM-dd');
      this.policyAccess.endDate = moment(latest_date).format();
    }
  }

  addPolicy() {
    this.loading = true;
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    
    var formData = new FormData();
    //console.log(this.policyAccess);
    // if (this.endDate != null) {
    //   this.dateSubmit();
    // }
    if (localStorage.getItem('subPol') === null) { 
      let url = APP_CONFIG.savePolicy;
      this.policyAccess.createdBy = Cookie.get('userName');
      formData.append('policy', JSON.stringify(this.policyAccess));
      for (let i = 0; i < this.files.length; i++) {
        formData.append('files', this.files[i]);
      }
      this.http.post(url, formData).subscribe((data: any) => {
        this.loading = false;
        this.modalService.open(this.content, ngbModalOptions);
      }, error => {
        this.loading = false;
        console.log(error);
      });
    }
    else {
      let url = APP_CONFIG.updatePolicy;
      this.policyAccess.updatedBy = Cookie.get('userName');
      formData.append('policy', JSON.stringify(this.policyAccess));
      for (let i = 0; i < this.files.length; i++) {
        formData.append('files', this.files[i]);
      }
      this.http.post(url, formData).subscribe((data: any) => {
        this.loading = false;
        this.modalService.open(this.content, ngbModalOptions);
      }, error => {
        this.loading = false;
        console.log(error);
      });
    }
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

  getUsers() {
    this._apiservice.getUsers()
      .subscribe((data: any) => {
        this.users = data;

      }, error => console.log(error));

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

  deletePolicy(id) {
    this.policyAccess.linkedPolicies.forEach(element => {
      if (element.policyId === id) {
        element.status = false;
        element.linkType = "update";
      }
    });
  }





}
