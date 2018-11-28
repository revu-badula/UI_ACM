import { ApiserviceService } from '../apiservice.service';
import { Solution, SystemType, HostingType, LabVendors, CertDocDTO, Vendor } from '../data_model';
import { APP_CONFIG } from '../app.config';
import { Component, OnInit, HostListener, ViewChild, ElementRef, NgModule, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { File } from 'babel-types';
import { Location } from '@angular/common';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { IMyDate } from 'mydatepicker';
import { Cookie } from 'ng2-cookies';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { DialogService } from '../dialog.service';

declare var swal: any; ''

@Component({
  selector: 'app-edit-solution',
  templateUrl: './edit-solution.component.html',
  styleUrls: ['./edit-solution.component.css'],
  providers: [ApiserviceService]

})


export class EditSolutionComponent implements OnInit {
  @ViewChild('fileInput') inputEl: ElementRef;
  @ViewChild('editForm') solutionsForm: NgForm;
  @ViewChild('content') content: TemplateRef<any>;
  color: String;
  solution: Solution;

  certDate: NgbDateStruct;

  renewDate: NgbDateStruct;
  showForm: boolean = true;
  clickExp: boolean = true;

  editSolution: FormGroup;
  certDocDTO: CertDocDTO;
  files: File[] = [];
  approveDate: any;
  dueDate: any;
  public selectDate: IMyDate = null;
  public renewalDate: IMyDate = null;
  public systemTypeDTO: any;
  public vendorDTO: any;
  public hostingTypeDTO: any;
  public labVendorsDTO: any;
  public solutionType: any;
  precinctTypes: any;
  config = {
    placeholder: '',
    tabsize: 2,
    height: 200,
    width: '100%',
    toolbar: [
      // [groupName, [list of button]]
      ['misc', ['undo', 'redo']],
      ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style0', 'ul', 'ol', 'paragraph', 'height']]
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times'],

  };
  public precinctTypeId: number;
  public loading: boolean = false;
  public isClick: boolean = false;
  public showFrm: boolean = true;
  //  public systemTyp:any

  constructor(private activatedRoute: ActivatedRoute, private _apiservice: ApiserviceService, private fb: FormBuilder
    , private http: Http, private _location: Location, private modalService: NgbModal,
    private router: Router, private dialogService: DialogService, private datepipe: DatePipe) {
    this.solution = new Solution();
    this.solution.systemTypeDTO = new SystemType();
    this.solution.hostingTypeDTO = new HostingType();
    this.solution.labVendorsDTO = new LabVendors();
    this.solution.vendor = new Vendor();
    this.solution.certDocDTOs = [] as CertDocDTO[];
    this.files = [] as File[];
    this.editSolution = this.fb.group({
      solutionId: 0,
      name: ['', Validators.required],
      versionNumber: ['', Validators.required],
      solutionTypeName: ['', Validators.required],
      labVendorId: [0, Validators.required],
      solutionType: 0,
      vendorId: 0,
      systemTypeTry: ['', Validators.required],
      systemTypeTry1: ['', Validators.required],
      systemType: this.fb.group({
        name: '',
        systemTypeId: 0
      }),
      hostingType: this.fb.group({
        name: '',
        hostingTypeId: '',
      }),
      labVendors: this.fb.group({
        name: '',
        firstName: '',
        lastName: '',
        middleName: '',
        suffix: '',
        emailId: '',
        streetName: '',
        city: '',
        state: '',
        zipcode: '',
        phoneNumber: '',
      }),
      vendor: this.fb.group({
        vendorId: 0,
        name: '',
        createdBy: '',
        vendorAddress: this.fb.group({
          addressId: 0,
          streetName: '',
          city: '',
          state: '',
          zipcode: '',
        }),
        vendorContact: this.fb.group({
          contactId: 0,
          firstName: '',
          lastName: '',
          middleName: '',
          suffix: '',
          emailId: '',
          phoneNumber: '',
        }),
      }),
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.solution.solutionId = params['id'];
      this.editSolution.disable();
      this.onDisplaySolution();
      this.getSolutionsOnload();

    });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  createCertDTO(fileInput: any, section: string) {
    let files = fileInput.target.files[0];
    if (files === undefined) { }
    else {
      this.certDocDTO = new CertDocDTO();
      this.certDocDTO.fileName = fileInput.target.files[0].name;
      this.certDocDTO.section = section;
      this.certDocDTO.activeFlag = true;
      this.files.push(fileInput.target.files[0]);
      this.solution.certDocDTOs.push(this.certDocDTO);
    }
  }

  dateRetreive() {


  }

  dateSubmit() {
    let date = this.approveDate.formatted;
    this.solution.certDt = Date.parse(date);
    let renewDate = this.dueDate.date;
    this.dueDate = renewDate.year + '-' + renewDate.month + '-' + (renewDate.day + 1);
    this.solution.certRenewalDueDt = this.dueDate;
  }


  getApprovalDate(value) {
    if (value.formatted === "") {
      this.solution.certDt = null;
    }
    else {
      let d = value.formatted;
      let latest_date = this.datepipe.transform(d, 'yyyy-MM-dd');
      this.solution.certDt = moment(latest_date).format();
    }
  }
  getDueDate(value) {
    if (value.formatted === "") {
      this.solution.certRenewalDueDt = null;
    }
    else {
      let d = value.formatted;
      let latest_date = this.datepipe.transform(d, 'yyyy-MM-dd');
      this.solution.certRenewalDueDt = moment(latest_date).format();
    }
  }

  onDisplaySolution() {
    this.loading = true;
    this._apiservice.getSolutionExtra(this.solution.solutionId)
      .subscribe((data: Solution) => {
        this.loading = false;
        this.solution = data;
        this.solution.systemTypeDTO = data.systemTypeDTO;
        this.solution.hostingTypeDTO = data.hostingTypeDTO;
        this.solution.labVendorsDTO = data.labVendorsDTO;
        this.solution.vendor = data.vendor;
        this.solution.certDocDTOs = data.certDocDTOs;
        if (this.solution.certDt === null) {
          this.dueDate = { date: null };
        }
        else {
          let d = new Date(this.solution.certDt);
          this.approveDate = {
            date: {
              year: d.getFullYear(),
              month: d.getMonth() + 1,
              day: d.getDate()
            }
          };
        }
          if(this.solution.certRenewalDueDt === null){
            this.approveDate = { date: null };
          }
          else{
          let rd = new Date(this.solution.certRenewalDueDt);
          this.dueDate = {
            date: {
              year: rd.getFullYear(),
              month: rd.getMonth() + 1,
              day: rd.getDate() + 1
            }
          };
        }
        var utcSeconds = this.solution.certDt;
        var dt = new Date(0);
        if (this.solution.certDocDTOs == null) {
          this.solution.certDocDTOs = [] as CertDocDTO[];
        }

      }, error => {
        this.loading = false;
        console.log(error);
      });
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



  deleteFile(id, index) {
    //this.confirm('Are You Sure?', 'delete the file', 'YES', 'NO')
    this.dialogService.open("Info", " Do you want to delete the file?", true, "Yes", "No")
      .then((result: any) => {
        if (result) {
          if (id === undefined) {
            let length = this.solution.certDocDTOs.length;
            if (length === 1) {
              this.files = [];
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
            for (let i = 0; i < this.solution.certDocDTOs.length; i++) {
              if (this.solution.certDocDTOs[i].certDocId === id) {
                this.solution.certDocDTOs[i].activeFlag = false;
              }
            }
          }
        }

      }, error => {
        console.log(error);
      });
  }

  createSolution() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    let url_update = APP_CONFIG.postSolution;
    let url_add = APP_CONFIG.addSolutions;
    var formData = new FormData();
    // if ((this.solution.certDt && this.solution.certRenewalDueDt) != null) {
    //   this.dateSubmit();
    // }
    this.solution.updatedBy = Cookie.get('userName');
    formData.append('solution', JSON.stringify(this.solution));
    for (let i = 0; i < this.files.length; i++) {
      formData.append('certDocs', this.files[i]);

    }
    this.loading = true;
    this.http.post(url_update, formData).subscribe((data: any) => {
      this.loading = false;
      this.modalService.open(this.content, ngbModalOptions);
    }, error => {
      this.loading = false;
      console.log(error);
    });
  }

  backClicked(event) {
    event.preventDefault();
    this._location.back();
  }

  open(content) {
    this.modalService.open(content);
    //this.plus=false;

  }

  editorGroup(): void {
    this.showForm = false;
    this.isClick = true;
    this.showFrm = false;
    this.clickExp = false;
  }




  showFile(id) {
    window.open(APP_CONFIG.getSolutionFile + '?' + 'fileID' + '=' + id)

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
  closeDropdown()
  {
    let el=document.getElementById('renname');
    if(el.classList.contains('open'))
    {
      el.classList.remove('open');
    }
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

















  getOpacity() {
    // return this.color === 'online' ? 0.8 : 1;
  }

}

