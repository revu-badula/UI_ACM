import { Component, OnInit, ViewChild, ElementRef, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Solution, SystemType, HostingType, LabVendors, CertDocDTO, Vendor } from '../data_model';
import { Http, HttpModule } from '@angular/http';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ApiserviceService } from '../apiservice.service';
import { APP_CONFIG } from '../app.config';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { Cookie } from 'ng2-cookies';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { DialogService } from '../dialog.service';
declare let tinymce:any;
@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.css'],
  providers: [ApiserviceService],
})
export class SolutionsComponent implements OnInit {
  @ViewChild('fileInput') inputEl: ElementRef;
  @ViewChild('fileInput1') inputEl1: ElementRef;
  @ViewChild('fileInput2') inputEl2: ElementRef;
  @ViewChild('fileInput3') inputEl3: ElementRef;
  @ViewChild('f') solutionsForm: NgForm;
  @ViewChild('content') content: TemplateRef<any>;
  solution: Solution;
  public systemTypeDTO: any;
  approveDate: any;
  renewalDate: any;
  public vendorDTO: any;
  public hostingTypeDTO: any;
  public labVendorsDTO: any;
  public solutionType: any;
  public labId: number;
  public len: any = 0;
  public labVendorsfirstName: string;
  public labVendorslastName: string;
  public labVendorsphoneNumber: string;
  public labVendorsemail: string;
  public labDetails: any;
  precinctTypes: any;
  public precinctTypeId: number;
  public showFrm: boolean = true;
  public showForm: boolean = false;
  certDocDTO: CertDocDTO;
  files: File[] = [];
  config: any = {
    height: 250,
    width:1180,
    theme: 'modern',
    plugins: 'textcolor wordcount colorpicker textpattern',
    toolbar: 'bold italic strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
    branding: false,
    menubar:false,
    statusbar:false
  };
  public labForm: boolean = false;
  public loading: boolean = false;
  date: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: true
  }
  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private _location: Location, private _apiservice: ApiserviceService,
    private http: Http, private modalService: NgbModal, private datepipe: DatePipe, 
    private dialogService: DialogService, private ref: ChangeDetectorRef) {
    this.solution = new Solution();
    this.solution.systemTypeDTO = new SystemType();
    this.solution.hostingTypeDTO = new HostingType();
    this.solution.labVendorsDTO = new LabVendors();
    this.solution.vendor = new Vendor();
    this.solution.certDocDTOs = [] as CertDocDTO[];
    this.files = [] as File[];
    this.config.init_instance_callback = (editor: any)=> {
      editor.on('keyup', () => {
            this.getData(editor);
      });
    }
  }

  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.getSolutionsOnload();

  }
  backClicked() {
    this._location.back();
  }


  createCertDTO(fileInput: any, section: string) {
    let files = fileInput.target.files[0];
    if (files === undefined) { }
    else {
      this.certDocDTO = new CertDocDTO();
      this.certDocDTO.fileName = fileInput.target.files[0].name;
      this.certDocDTO.section = section;
      this.files.push(fileInput.target.files[0]);
      this.solution.certDocDTOs.push(this.certDocDTO);
      if (section === "hosting") {
        this.inputEl.nativeElement.value = "";
      }
      else if (section === "standard") {
        this.inputEl1.nativeElement.value = "";
      }
      else if (section === "patches") {
        this.inputEl2.nativeElement.value = "";
      }
      else {
        this.inputEl3.nativeElement.value = "";
      }
    }
  }




  showLabVendor(id) {
    this.solution.labVendorsDTO.labVendorId = id;
    if (id === 'Choose') {
      this.labForm = false;
    }
    else {
      this.labForm = true;
      let details: any = this.labVendorsDTO;
      this.labDetails = details.filter(item => item.labVendorId == id);
      this.labVendorsfirstName = this.labDetails[0].firstName;
      this.labVendorslastName = this.labDetails[0].lastName;
      this.labVendorsphoneNumber = this.labDetails[0].phoneNumber;
      this.labVendorsemail = this.labDetails[0].emailId;

    }

  }

  getData(editor:any)
  {
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
  }


  cancelButton(event:any) {
    event.preventDefault();
    this.router.navigate(['/dashboard']);
  }

  redirect() {
    this.router.navigate(['/solutionsView']);
  }

  getSolutionsOnload() {
    this.loading = true;
    this._apiservice.getSolutionsOnload()
      .subscribe((data: any) => {
        this.loading = false;
        this.systemTypeDTO = data.systemTypeDTOs;
        this.solutionType = data.solutionTypeDTOs;
        this.vendorDTO = data.vendorsDTOs;
        this.hostingTypeDTO = data.hostingTypeDTOs;
        this.labVendorsDTO = data.labVendorsDTOs;
        this.precinctTypes = data.precinctTypeDTOs;


      }, error => {
        this.loading = false;
        console.log(error);
      });
  }

  dateSubmit() {
    let date = this.approveDate.formatted;
    this.solution.certDt = Date.parse(date);
    let renewDate = this.renewalDate.date;
    this.renewalDate = renewDate.year + '-' + renewDate.month + '-' + (renewDate.day + 1);
    this.solution.certRenewalDueDt = this.renewalDate;
  }

  getApproveDt(value:any) {
    if (value.formatted === "") {
      this.solution.certDt = null;
    }
    else {
      let d = value.formatted;
      let latest_date = this.datepipe.transform(d, 'yyyy-MM-dd');
      this.solution.certDt = moment(latest_date).format();
    }
  }
  getRenewDt(value:any) {
    if (value.formatted === "") {
      this.solution.certRenewalDueDt = null;
    }
    else {
      let d = value.formatted;
      let latest_date = this.datepipe.transform(d, 'yyyy-MM-dd');
      this.solution.certRenewalDueDt = moment(latest_date).format();
    }
  }

  createSolution() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    let url = APP_CONFIG.addSolutions;

    // if ((this.approveDate && this.renewalDate) != null) {
    //   this.dateSubmit();
    // }
    var formData = new FormData();
    this.solution.createdBy = Cookie.get('userName');
    formData.append('solution', JSON.stringify(this.solution));
    for (let i = 0; i < this.files.length; i++) {
      formData.append('certDocs', this.files[i]);

    }
    this.loading = true;

    this.http.post(url, formData).subscribe((data: any) => {
      this.loading = false;
      this.modalService.open(this.content, ngbModalOptions);
    }, error => {
      this.loading = false;
      console.log(error);
    });

  }

  open(content:any) {
    this.modalService.open(content);


  }

  deleteFile(id:any, index:any) {
    //this.confirm('Are You Sure?', 'delete the file', 'YES', 'NO')
    this.dialogService.open("Info", " Do you want to delete the file?", true, "Yes", "No")
      .then((result: any) => {
        if (result) {
          if (id === undefined) {
            let length = this.solution.certDocDTOs.length;
            if (length === 1) {
              this.solution.certDocDTOs = [];
            }
            else {
              for (let j = 0; j < this.files.length; j++) {
                if (this.files[j].name === this.solution.certDocDTOs[index].fileName) {
                  this.files.splice(j, 1);
                }
              }
              for (let i = index; i < length; i++) {
                this.solution.certDocDTOs[i] = this.solution.certDocDTOs[i + 1];
              }
              this.solution.certDocDTOs.splice(length - 1, 1);
            }

          }
          else {

            this.solution.certDocDTOs.splice(index, 1);
          }
        }

      }, error => {
        console.log(error);
      });
  }



  

  onSubmit() {

  }
}
