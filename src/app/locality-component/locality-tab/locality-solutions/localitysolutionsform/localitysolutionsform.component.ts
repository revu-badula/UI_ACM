import { Component, OnInit, OnChanges, ViewChild, TemplateRef } from '@angular/core';
import { APP_CONFIG } from '../../../../app.config';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationSolution, SolutionsDTO, Vendor, Device, HostingType, SystemType } from '../../../../data_model_lsolutions';
import { Solution } from '../../../../data_model';
import { ApiserviceService } from '../../../../apiservice.service';
import { UtilService } from '../../../../util.service';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { IMyDate } from 'mydatepicker';
import { formatDate } from '@angular/common';
import { Cookie } from 'ng2-cookies';
import { NgbdModalContent } from '../ngb-modal.component';

@Component({
  selector: 'app-localitysolutionsform',
  templateUrl: './localitysolutionsform.component.html',
  styleUrls: ['./localitysolutionsform.component.css'],
  providers: [ApiserviceService]
})
export class LocalitysolutionsformComponent implements OnInit {
  @ViewChild('content') content: TemplateRef<any>;
  @ViewChild('insta') insta: TemplateRef<any>;
  @ViewChild('box') box: TemplateRef<any>;
  public vendor: Vendor;
  precinctTypes: any;
  systemTypes: any;
  solutions: SolutionsDTO;
  applicationSolution: ApplicationSolution;
  solution: Solution;
  device: Device;
  editableForm: boolean = true;
  public showButton: boolean = true;
  public names: any;
  hostingnames: any;
  public precinctTypeId: number;
  public modelSname: string;
  public solutionId: number;
  public appId: any;
  public modalForm: FormGroup;
  public appSolutions: any;
  public appSolutionId: any;
  public appSolutionDevice: any;
  public hostingTypeId: any;
  public solutionTypeName: any;
  public versionNumber: any;
  public vendors: any;
  public showPrecinct: any;
  public showText: any;
  contentData: string = "";
  public devices: any;
  public deviceId: any;
  public isVisible = false;
  public showLegal = false;
  public showInnerForm = false;
  public isAddNewSolution = false;
  public notVisible = false;
  public boxVisible = false;
  public editForm: boolean = true;
  public acronym: any;
  public updatedTime: any;
  public loading: boolean = false;
  public sysName: any;
  public isClick: boolean = true;
  public showBuck: boolean = true;
  public hostType: any;
  public showPlus: boolean=true;


  constructor(private _fb: FormBuilder, private router: Router, private modalService: NgbModal,
    private _apiservice: ApiserviceService, private http: Http,
    private utilservice: UtilService, private datepipe: DatePipe) {
    this.applicationSolution = new ApplicationSolution();
    this.solution = new Solution();
    this.applicationSolution.solutionsDTO = new SolutionsDTO();
    this.applicationSolution.solutionsDTO.vendor = new Vendor();
    this.applicationSolution.solutionsDTO.hostingTypeDTO = new HostingType();
    this.applicationSolution.solutionsDTO.systemTypeDTO = new SystemType();
    this.device = new Device();
    this.getAppId();
    //this.viewApplication(localStorage.getItem('localityName'));


  }

  ngOnInit() {
    this.showPrecinctType();
    if (this.utilservice.isLocalitySolutionAdd) {
      this.isAddNewSolution = true;
    } else {
      this.isAddNewSolution = false;
    }
  }


  getAppId() {
    this.loading = true;
    this._apiservice.viewApplication(localStorage.getItem('localityName'))
      .subscribe((data: any) => {
        this.loading = false;
        this.acronym = data.applicationViewDTO.acronym;
        let d = new Date(data.applicationViewDTO.updatedTime);
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        this.updatedTime = month + "/" + day + "/" + year;
        this.appId = data.applicationViewDTO.applicationId;
        this.applicationSolution.applicationID = data.applicationViewDTO.applicationId;

        if (localStorage.getItem('appSolId') === null) {
          this.editableForm=false;
        }
        else {

          let id = localStorage.getItem('appSolId');
          let aSolId = +id;
          this.showSolutionsPage(aSolId);
        }

      }, error => {
        this.loading = false;
        console.log(error);
      });
  }




  backClicked() {
    this.router.navigate(['/locality/tab/solutions']);

  }

  showSolutionsPage(appSolutionId) {
    this.isClick = false;
    this.isVisible = true;
    this.notVisible = true;
    this.boxVisible = true;
    this.showInnerForm = true;
    this.editableForm = true;
    this.showPlus=false;
    this.appSolutionId = appSolutionId;
    this.loading = true;
    this._apiservice.getAppSolution(appSolutionId)
      .subscribe((data: any) => {
        this.loading = false;
        this.applicationSolution = data;
        this.applicationSolution.solutionsDTO = data.solutionsDTO;
        this.applicationSolution.solutionsDTO.vendor = data.solutionsDTO.vendor;
        this.devices = data.appSolutionDevices;
        this.applicationSolution.solutionsDTO.systemTypeDTO = data.solutionsDTO.systemTypeDTO;
        this.applicationSolution.appSolutionDevices = data.appSolutionDevices;
        this.hostType = data.hostingType.name;
        this.selectBox(data.solutionsDTO.systemTypeDTO.systemTypeId,data.solutionsDTO.precinctTypeId);
      }, error => {
        this.loading = false;
        console.log(error);
      });

  }


  saveAppSolution() {

    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    if (this.appSolutionId === undefined) {
      // this.isClick = true;
      this.applicationSolution.createdBy = Cookie.get('userName');
      this.applicationSolution.solutionsDTO.solutionId = this.solutionId;
      this.applicationSolution.solutionId = this.solutionId;
      this.applicationSolution.applicationID = this.appId;
      var formData = new FormData();
      formData.append('appSolutionString', JSON.stringify(this.applicationSolution));
      let url_update = APP_CONFIG.saveAppSolution;
      this.loading = true;
      this.http.post(url_update, formData)
        .map(res => res.json())
        .subscribe((data: any) => {
          this.isVisible = true;
          this.loading = false;
          this.contentData = "Solution has been created.";
          this.modalService.open(this.insta, ngbModalOptions);
          this.appSolutionId = data.applicationSolutionDTO.appSolutionId;
        }, error => {
          this.loading = false;
          console.log(error);
        });

    }
    else {
      this.applicationSolution.updatedBy = Cookie.get('userName');
      //this.applicationSolution.appSolutionId = this.appSolutionId;
      this.applicationSolution.solutionId = this.applicationSolution.solutionsDTO.solutionId;
      //this.applicationSolution.solutionsDTO.solutionId = this.solutionId;
      //this.applicationSolution.applicationID = this.appId;
      var formData = new FormData();
      formData.append('appSolutionString', JSON.stringify(this.applicationSolution));
      let url_update = APP_CONFIG.updateAppSolution;
      this.loading = true;
      this.http.post(url_update, formData).subscribe((data: any) => {
        this.loading = false;
        this.contentData = "Solution has been updated.";
        this.modalService.open(this.insta, ngbModalOptions);
      }, error => {
        this.loading = false;
        console.log(error);
      });

    }
  }





  showPrecinctType() {
    //this.loading = true;
    this._apiservice.getSolutionsOnload()
      .subscribe((data: any) => {
        //this.loading = false;
        this.precinctTypes = data.precinctTypeDTOs;
        this.systemTypes = data.systemTypeDTOs;
      }, error => {
        //this.loading = false;
        console.log(error);
      });

  }

  selectPrecinct(id) {
    if (id === 'Choose...' || id === "") {
      this.showPrecinct = false;

    }
    else {
      this.showPrecinct = true;
      this.precinctTypeId = id;
      this.applicationSolution.solutionsDTO.precinctTypeId = id;
    }


  }

  selectModSolution(solutionId) {
    if(solutionId === "")
    {

    }
    else{
    this.solutionId = solutionId;
    this.loading = true;
    this._apiservice.getSolutionExtra(solutionId)
      .subscribe((data: any) => {
        this.loading = false;
        this.showInnerForm = true;
        this.solution = data;
        this.applicationSolution.solutionsDTO.name=this.solution.name;
        this.applicationSolution.solutionsDTO = this.solution
        this.applicationSolution.solutionsDTO.solutionTypeName = this.solution.solutionTypeName;
        this.applicationSolution.solutionsDTO.versionNumber = this.solution.versionNumber;
        this.applicationSolution.solutionsDTO.vendor = this.solution.vendor;
        this.applicationSolution.solutionsDTO.hostingTypeDTO = this.solution.hostingTypeDTO;
        this.applicationSolution.hostingType=this.solution.hostingTypeDTO;
        this.hostType = this.solution.hostingTypeDTO.name;





      }, error => {
        this.loading = false;
        console.log(error);
      });
    }

  }
  open(content) {
    this.showButton = true;
    this.boxVisible = false;
    //this.createForm();
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(content, ngbModalOptions);

    //  this.modalForm.disable();

  }

  open1() {
    UtilService.popModal = false;
    this.showButton = false;
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    const modalRef = this.modalService.open(NgbdModalContent, ngbModalOptions);
    modalRef.componentInstance.appSolutionId = this.appSolutionId;
    modalRef.result.then(result => {
      if (UtilService.popModal) {
        this.getDevices(this.appSolutionId);
      }
      else {

      }
    }, reason => {
      console.log(reason);
    });
  }

  open2(table) {
    UtilService.popModal = false;
    this.showButton = false;
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    const modalRef = this.modalService.open(NgbdModalContent, ngbModalOptions);
    modalRef.componentInstance.appSolutionId = this.appSolutionId;
    modalRef.componentInstance.deviceData = table;
    modalRef.componentInstance.isEdit = true;
    modalRef.result.then(result => {
      if (UtilService.popModal) {
        this.getDevices(this.appSolutionId);
      }
      else {

      }
    }, reason => {
      console.log(reason);
    });
  }

  editClicked() {
    this.isAddNewSolution = true;
    this.isClick = true;
    this.editForm = false;
    this.editableForm = false;
    this.showPlus=true;
    this.showLegal=true;
  }




  showClick() {
    this.showBuck = true;
  }

  editClick(): void {


    if (this.modalForm.disabled) {
      this.modalForm.enable();

    }
    else {
      this.modalForm.disable();

    }
  }
  selectSystemType(id) {

    if (id === 'Choose...' || id === "") {
      this.names = [];
    } else {
      this.selectBox(id, this.applicationSolution.solutionsDTO.precinctTypeId);
    }

  }

  selectForm(solutionId) {

    if (solutionId === 'Choose...') {

    }
    else {
      //this.loading = true;
      this._apiservice.getSolution(solutionId)
        .subscribe((data: any) => {
          //this.loading = false;
        }, error => {
          //this.loading = false;
          console.log(error);
        });


    }

  }


  selectBox(systemType, precinctTypeId) {

    if (systemType === 'Choose...') {
      this.names = [];

    }
    else {

      this._apiservice.getSolutionsOnType(systemType, precinctTypeId)
        .subscribe((data: any) => {
          this.names = data.solutionsDTOs;
        }, error => {

          console.log(error);
        });
    }
  }

  getDevices(id) {
    let url = APP_CONFIG.getDevices;
    let url_update = url + '?' + 'solutionId' + '=' + id;
    this.http.get(url_update)
      .map(res => res.json())
      .subscribe((data: any) => {
        this.showBuck = false;
        this.devices = data.appSolutionDevices;


      }, error => {

        console.log(error);
      });
  }

  close(event) {
    event.preventDefault();
    this.router.navigate(['/locality/tab/solutions']);
  }

  getHostingType(value) {
    if (value === 'Choose...') {

    }
    else {
      this.applicationSolution.solutionsDTO.hostingTypeDTO.name = value;
    }

  }


}