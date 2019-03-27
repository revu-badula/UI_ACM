import { Component, OnInit, ViewChild, TemplateRef, HostListener, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { AssessmentPolicyDTO, Policy, PolicyDocumentsDTO } from '../assessmentpolicydto';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { APP_CONFIG } from '../app.config';
import { ApiserviceService } from '../apiservice.service';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { DialogService } from '../dialog.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-assessmentpolicyupdate',
  templateUrl: './assessmentpolicyupdate.component.html',
  styleUrls: ['./assessmentpolicyupdate.component.css']
})
export class AssessmentpolicyupdateComponent implements OnInit {

  color: String;
  public loading: boolean = false;
  @ViewChild('fileInput') inputEl: ElementRef;
  @ViewChild('content') content: TemplateRef<any>;
  policyAccess: Policy;
  appPolicy: AssessmentPolicyDTO
  public users: any;
  showForm: boolean = true;
  public endDate: any;
  files: File[] = [];
  public showEli: boolean = true;
  policyDocumentDTO: PolicyDocumentsDTO;
  public showFrm: boolean = false;
  public assessmentPolicyId: any;
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
  constructor(private _location: Location, private http: Http, private datepipe: DatePipe,
    private activatedRoute: ActivatedRoute, private _apiservice: ApiserviceService,
    private modalService: NgbModal, private router: Router, private dialogService: DialogService, private utilService:UtilService) {
    this.policyAccess = new Policy();
    this.appPolicy = new AssessmentPolicyDTO();
    this.policyDocumentDTO = new PolicyDocumentsDTO();
  }

  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    this.activatedRoute.params.subscribe(params => {
      this.assessmentPolicyId = params['id'];
      //this.policyAccess.policyId = params['id'];
    });
    this.getUsers();
    this.getPolicy(this.assessmentPolicyId)
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
    this.showFrm=true;
    this.showForm = false;
    this.showEli = false;
  }

  getPolicy(id) {
    this.loading = true;
    this._apiservice.getAssessmentPolicyDetails(id)
      .subscribe((data: any) => {
        this.loading = false;
        this.policyAccess = data.policyDTO;
        this.appPolicy = data;
        if (this.appPolicy.endDate === null) {
          this.endDate = { date: null };
        }
        else {
          let d = new Date(this.appPolicy.endDate);
          let year = d.getFullYear();
          let month = d.getMonth() + 1;
          let day = d.getDate();
          this.endDate = {
            date: { month: month, day: day, year: year }
          };
        }
      }, error => {
        this.loading = false;
        console.log(error);
      })
  }

  getEndDate(value)
  {
    if (value.formatted === "") {
      this.appPolicy.endDate = null;
    }
    else {
      let d = value.formatted;

      let latest_date = this.datepipe.transform(d, 'yyyy-MM-dd');
      this.appPolicy.endDate = moment(latest_date).format();
    }
  }

  addAppPolicy() {
    this.loading = true;
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.loading=true;
    this.appPolicy.updatedBy=Cookie.get("userName");
    this.appPolicy.assignedBy=Cookie.get("userName");
    this.policyAccess.updatedBy=Cookie.get("userName");
    let url = APP_CONFIG.updateAssessmentPolicyDetails;
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // let options = new RequestOptions({ headers: headers });
    // let data = JSON.stringify(this.appPolicy);

    var formData = new FormData();
    formData.append('appAuditPolicyString', JSON.stringify(this.appPolicy));
    for (let i = 0; i < this.files.length; i++) {
      formData.append('file', this.files[i]);

    }
    this.http.post(url,formData).subscribe((data: any) => {
        this.loading=false;
        this.modalService.open(this.content, ngbModalOptions);
      }, error => { 
        this.loading=false;
        console.log(error) });
  }

  getPolicyDocumentAttch(id) {
    //window.open(APP_CONFIG.getPolicyDocumentAttch + '?' + 'policyDocId' + '=' + id)
    this.utilService.getFile(id);
  }

  goToSubControl() {
    localStorage.setItem('appParentPolicyId', this.assessmentPolicyId);
    this.router.navigate(['/assessmentPolicyAdd']);

  }

  getSubpolicy(id)
  {
    let url="accessCntrl1/"+id;
    this.router.navigateByUrl(url);
  }


  createPolicyDocumentDTO(fileInput: any) {
    this.policyDocumentDTO = new PolicyDocumentsDTO();
    this.policyDocumentDTO.documentName = fileInput.target.files[0].name;
    this.policyDocumentDTO.activeFlag = true;
    this.files.push(fileInput.target.files[0]);

    if (this.appPolicy.policyDocumentsDTOs == null) {
      this.appPolicy.policyDocumentsDTOs = [];
    }
    this.appPolicy.policyDocumentsDTOs.push(this.policyDocumentDTO);
    this.inputEl.nativeElement.value = "";

  }
  deleteFile(id, index) {
    //this.confirm('Are You Sure?', 'delete the file', 'YES', 'NO')
    this.dialogService.open("Info", "Do you want to delete the file?", true, "Yes", "No")
      .then((result: any) => {
        if (result) {
          if (id === undefined) {
            let length = this.appPolicy.policyDocumentsDTOs.length;
            if (length === 1) {
              this.appPolicy.policyDocumentsDTOs = []; //a,b,c,d,f = [2] =[3]
              this.files=[];
            }
            else {

              for(let j=0;j<this.files.length;j++)
              {
                if(this.files[j].name === this.appPolicy.policyDocumentsDTOs[index].documentName)
                {
                  this.files.splice(j,1);
                }
              }
              for (let i = index; i < length; i++) {
                this.appPolicy.policyDocumentsDTOs[i] = this.appPolicy.policyDocumentsDTOs[i + 1];
              }
              this.appPolicy.policyDocumentsDTOs.splice(length - 1, 1);
            }

          }
          else {
            for (let i = 0; i < this.appPolicy.policyDocumentsDTOs.length; i++) {
              if (this.appPolicy.policyDocumentsDTOs[i].policyDocId === id) {
                this.appPolicy.policyDocumentsDTOs[i].activeFlag = false;
              }
            }
          }

        }
      }, error => {
        console.log(error);
      });
  }

  public scoreN:any;
  public scoreD:any;
  public weightageN:any;
  public weightageD:any;
  public result:any;
  public realScore:any;

  getNum()
  {

  }

 


  getDem()
  {
    this.result=this.weightageN/this.weightageD;
    console.log(this.result);
  }

  getRealScore()
  {
    let res = this.result*this.scoreN;
    this.realScore=res;

  }



}
