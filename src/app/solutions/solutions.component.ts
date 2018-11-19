import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
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
declare var swal: any; ''
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.css'],
  providers: [ApiserviceService],
})
export class SolutionsComponent implements OnInit {
  @ViewChild('fileInput') inputEl: ElementRef;
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
  //public labForm: string;
  public labForm: boolean = false;
  public loading: boolean = false;
  date: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: true
  }
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private _location: Location, private _apiservice: ApiserviceService, private http: Http, private modalService: NgbModal) {
    this.solution = new Solution();
    this.solution.systemTypeDTO = new SystemType();
    this.solution.hostingTypeDTO = new HostingType();
    this.solution.labVendorsDTO = new LabVendors();
    this.solution.vendor = new Vendor();
    this.solution.certDocDTOs = [] as CertDocDTO[];
    this.files = [] as File[];
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
    this.certDocDTO = new CertDocDTO();
    this.certDocDTO.fileName = fileInput.target.files[0].name;
    this.certDocDTO.section = section;
    this.files.push(fileInput.target.files[0]);
    this.solution.certDocDTOs.push(this.certDocDTO);
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


  cancelButton(event) {
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

  createSolution() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    let url = APP_CONFIG.addSolutions;

    if ((this.approveDate && this.renewalDate) != null) {
      this.dateSubmit();
    }
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

  open(content) {
    this.modalService.open(content);


  }

  deleteFile(id, index) {
    this.confirm('Are You Sure?', 'delete the file', 'YES', 'NO')
      .then((result: any) => {
        if (result.value !== undefined && result.value) {
          if (id === undefined) {
            let length = this.solution.certDocDTOs.length;
            if (length === 1) {
              this.solution.certDocDTOs = [];
            }
            else {
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

  onSubmit() {

  }
}
