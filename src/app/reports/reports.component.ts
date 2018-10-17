import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Http } from '@angular/http';
import { UtilService } from '../util.service';
import { ApplicationSolution, SolutionsDTO, Vendor, Device, HostingType, SystemType } from '../data_model_lsolutions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Solution } from '../data_model';


import * as moment from 'moment';
import { DatePipe } from '@angular/common';

import { formatDate } from '@angular/common';
import { Cookie } from 'ng2-cookies';



@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  public displayData: number;
  public Localities: any;
  public p:number=1;
  public desc:boolean=false;
  public names: any;
  //  systemTypes: any;
    sysTypes:any;

    ////////////
    public vendor: Vendor;
  precinctTypes: any;
  systemTypes: any;
  solutions: SolutionsDTO;
  applicationSolution: ApplicationSolution;
  solution: Solution;
  device: Device;
  editableForm: boolean = true;
  public showButton: boolean = true;

  hostingnames: any;
  public precinctTypeId: number;
  public modelSname: string;
  public solutionId: number;
  public appId: any;

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

    //////////////////////
  constructor(private _apiservice: ApiserviceService,
    private http: Http, private modalService: NgbModal, private utilservice: UtilService,
    private router: Router) {


  }

  ngOnInit() {

    this.getLocalityTotal();
    this.getAllMOUs();
    this.showDropdown();
  }

  getLocalityTotal() {
    this._apiservice.getLocalityTotal().
      subscribe((data: any) => {
        this.displayData = data;
      }, error => {
        console.log(error);

      }


      );

  }


 showDropdown() {

      this._apiservice.getSolutionsOnload()
      .subscribe((data: any) => {
        this.systemTypes = data.systemTypeDTOs;
      }, error => { console.log(error); });

  }

  selectSystem(systemTypeId) {

  
 
    UtilService.sysId = systemTypeId;
    this._apiservice.getSolOnTypeForReports(systemTypeId)
        .subscribe((data: any) => {
        this.sysTypes = data.solutionDTOs;
        console.log(this.sysTypes.name);
      }, error => { console.log(error) });
   



  }


  getAllMOUs() {
    this._apiservice.getAllMOUs().
      subscribe((data: any) => {
        this.Localities = data;
      }, error => {
        console.log(error);

      }


      );

  }

  //////////////////////////////////////////////


 

  // selectModSolution(solutionId) {
  //   if(solutionId === "")
  //   {

  //   }
  //   else{
  //   this.solutionId = solutionId;
  //   this.loading = true;
  //   this._apiservice.getSolutionExtra(solutionId)
  //     .subscribe((data: any) => {
  //       this.loading = false;
  //       this.showInnerForm = true;
  //       this.solution = data;
  //       this.applicationSolution.solutionsDTO.name=this.solution.name;
        




  //     }, error => {
  //       this.loading = false;
  //       console.log(error);
  //     });
  //   }

  // }


 

 




  

  
  // selectSystemType(id) {

  //   if (id === 'Choose...' || id === "") {
  //     this.names = [];
  //   } else {
  //     this.selectBox(id);
  //   }

  // }

  // selectForm(solutionId) {

  //   if (solutionId === 'Choose...') {

  //   }
  //   else {
  //     //this.loading = true;
  //     this._apiservice.getSolution(solutionId)
  //       .subscribe((data: any) => {
  //         //this.loading = false;
  //       }, error => {
  //         //this.loading = false;
  //         console.log(error);
  //       });


  //   }

  // }


  // selectBox(systemType) {

  //   if (systemType === 'Choose...') {
  //     this.names = [];

  //   }
  //   else {

  //     this._apiservice.getSolOnTypeForReports(systemType)
  //       .subscribe((data: any) => {
  //         this.names = data.solutionsDTOs;
  //       }, error => {

  //         console.log(error);
  //       });
  //   }
  // }

  

  // close(event) {
  //   event.preventDefault();
  //   this.router.navigate(['/locality/tab/solutions']);
  // }

  // getHostingType(value) {
  //   if (value === 'Choose...') {

  //   }
   

  // }

  ////////////////////////////////////////////////



}
