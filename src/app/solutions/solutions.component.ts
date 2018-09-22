import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Solution, SystemType, HostingType, LabVendors, CertDocDTO, Vendor} from '../data_model';
import { Http, HttpModule } from '@angular/http';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {finalize} from 'rxjs/operators';
import {ApiserviceService} from '../apiservice.service';
import { APP_CONFIG } from '../app.config';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
declare var swal: any; ''


@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.css'],
  providers: [ApiserviceService],
})
export class SolutionsComponent implements OnInit {
  @ViewChild('fileInput') inputEl: ElementRef;
  @ViewChild('f') solutionsForm: NgForm;
  solution: Solution;
  public systemTypeDTO: any;
  approveDate:any;
  renewalDate : any;
  public vendorDTO: any;
  public hostingTypeDTO: any;
  public labVendorsDTO: any;
  public solutionType: any;
  public labId: number;
  public labVendorsfirstName: string;
  public labVendorslastName: string;
  public labVendorsphoneNumber: string;
  public labDetails: any;
  precinctTypes: any;
  public precinctTypeId: number;
  public showFrm: boolean = true;
  public showForm: boolean = false;
   certDocDTO: CertDocDTO;
  files: File[] = [];
      //public labForm: string;
  public labForm: boolean=false;
        date: Date = new Date();
        settings = {
        bigBanner: true,
        timePicker: false,
        format: 'dd-MM-yyyy',
        defaultOpen: true
    }
  constructor( private activatedRoute: ActivatedRoute,private router: Router,private _location: Location, private _apiservice: ApiserviceService, private  http: Http, private modalService: NgbModal) { 
    this.solution = new Solution();
    this.solution.systemTypeDTO = new SystemType();
    this.solution.hostingTypeDTO = new HostingType();
    this.solution.labVendorsDTO = new LabVendors();
    this.solution.vendor = new Vendor();
     this.solution.certDocDTOs = [] as CertDocDTO[];
    this.files = [] as File[];
  }

  ngOnInit() {
   this.getSolutionsOnload();
    
  }
   backClicked() {
        this._location.back();
    }
  
  
   createCertDTO(fileInput: any, section: string)
  {
    this.certDocDTO = new CertDocDTO();
    this.certDocDTO.fileName = fileInput.target.files[0].name;
    this.certDocDTO.section = section;
    console.log(fileInput.target.files[0]);
    this.files.push(fileInput.target.files[0]);
    console.log(this.solution.certDocDTOs)
    this.solution.certDocDTOs.push(this.certDocDTO);
  }
  
//  labContact(lab) {
//      this.labForm = lab;
//
//}
  showLabVendor(id)
  {
    this.solution.labVendorsDTO.labVendorId = id;
    if(id === 'Choose')
      {
      this.labForm=false;
    }
    else{
    this.labForm = true;
     let details:any=this.labVendorsDTO;
      console.log(details);
     this.labDetails=details.filter(item => item.labVendorId == id);
        this.labVendorsfirstName = this.labDetails[0].firstName;
        this.labVendorslastName = this.labDetails[0].lastName;
        this.labVendorsphoneNumber = this.labDetails[0].phoneNumber;
//      
//      console.log(this.labVendorsfirstName);
//      console.log(this.labVendorslastName);
//      console.log(this.labVendorsphoneNumber);
      
      
      
       
    }
    //this.getLabId(id);
  }
  
  /*getLabId(id){
    if(id===1){
      this.labVendorsfirstName=this.solution.labVendorsDTO.firstName;
      this.labVendorslastName=this.solution.labVendorsDTO.lastName;
      this.labVendorsphoneNumber=this.solution.labVendorsDTO.phoneNumber;
    }
  }*/
  
  /*selectPrecinct(id)
  {
  this.precinctTypeId = id;
  }*/
  
  d(){
  this.router.navigate(['/dashboard']);
  }
  
  getSolutionsOnload() {
    this._apiservice.getSolutionsOnload()
      .subscribe((data: any) => {
        // console.log(data);
        this.systemTypeDTO = data.systemTypeDTOs;
        // this.editSolution.controls['systemTypeTry1'].setValue(data.systemTypeDTO.name);
//        this.systemTyp = data.systemTypeDTO.name;
       // console.log(this.systemTypeDTO);
        this.solutionType = data.solutionTypeDTOs;
        this.vendorDTO = data.vendorsDTOs;
        this.hostingTypeDTO = data.hostingTypeDTOs;
        this.labVendorsDTO = data.labVendorsDTOs;
        this.precinctTypes = data.precinctTypeDTOs;
        console.log(this.labVendorsDTO);

      }, error => console.log(error));
  }
  
  dateSubmit(){
  	let date = this.approveDate.formatted;
    this.solution.certDt = Date.parse(date);
        let renewDate = this.renewalDate.date;
        this.renewalDate = renewDate.year + '-' + renewDate.month + '-' + (renewDate.day + 1);
        this.solution.certRenewalDueDt = this.renewalDate;
  }
  
      createSolution() {
     let url = APP_CONFIG.addSolutions;
    //value['solutionId'] = this.solution.solutionId;
    //value['vendorId'] = this.vendorDTO.vendorId;
    //value['labVendorId'] = this.labVendorDTO.labVendorId;
    if((this.approveDate && this.renewalDate)!=null){
    	this.dateSubmit();
    }
    var formData = new FormData();
        /*let date = this.approveDate.formatted;
    this.solution.certDt = Date.parse(date);
        let renewDate = this.renewalDate.date;
        this.renewalDate = renewDate.year + '-' + renewDate.month + '-' + (renewDate.day + 1);
        this.solution.certRenewalDueDt = this.renewalDate;*/
    formData.append('solution', JSON.stringify(this.solution));
    //formData.append('certDocs', this.files);
    //formData.append('certDocs',files)
    for (let i = 0; i < this.files.length; i++) {
     formData.append('certDocs', this.files[i]);

    }
    //    formData.append('file',files);
    console.log(formData.get('certDocs'));
    console.log(formData.get('solution'));
    //this._apiservice.updateSolution(formData)

    this.http.post(url, formData).subscribe((data: any) => {
      console.log(data);
    }, error => console.log(error));
     console.log(this.solutionsForm);
  }
  
   open(content) {
   this.modalService.open(content);
   //this.plus=false;

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
   
        this.solution.certDocDTOs.splice(index,1);
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
  
  onSubmit(){
    console.log(this.solutionsForm);
  }
}
