import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';
import { Http } from '@angular/http';
import { UtilService } from '../../util.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';



import * as moment from 'moment';
import { DatePipe } from '@angular/common';

import { formatDate } from '@angular/common';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-report-solutions',
  templateUrl: './report-solutions.component.html',
  styleUrls: ['./report-solutions.component.css']
})
export class ReportSolutionsComponent implements OnInit {
  
  public displayData: number;

  public Locals:any;
  public p:number=1;
  public desc:boolean=false;
  public names: any;
   sysTypes:any;

  precTypes: any;
  systemTypes: any;
 

  editableForm: boolean = true;
  public showButton: boolean = true;
  color: String;
  hostingnames: any;
  public precinctTypeId: number;
  public modelSname: string;
  public solutionId: number;
  public appId: any;
public precitTypes:any;
  public appSolutions: any;
  public appSolutionId: any;
  public appSolutionDevice: any;
  public hostingTypeId: any;
  public solutionTypeName: any;
  public versionNumber: any;
  public vendors: any;
  
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
   constructor(private _apiservice: ApiserviceService,
    private http: Http, private modalService: NgbModal, private utilservice: UtilService,
    private router: Router) { }

  ngOnInit() {
   this.showDropdown();
   this.showPrecinct();
  }



getColor() {
    return this.color === 'online' ? '#ffffff' : 'white';
  }
  getOpacity() {
    return this.color === 'online' ? 0.8 : 1;
  }
  
  showDropdown() {

      this._apiservice.getSolutionsOnload()
      .subscribe((data: any) => {
        this.systemTypes = data.systemTypeDTOs;
      }, error => { console.log(error); });

  }
  
  
  showPrecinct(){
  
      this._apiservice.getSolutionsOnload()
      .subscribe((data: any) => {
        this.precTypes = data.precinctTypeDTOs;
      }, error => { console.log(error); });
  }
  
  

  selectSystem(systemTypeId) {

   if (systemTypeId === 'Choose...' || systemTypeId === "") {
      this.sysTypes = [];
    }
    else {
    
 
    UtilService.sysId = systemTypeId;
    this._apiservice.getSolOnTypeForReports(systemTypeId)
        .subscribe((data: any) => {
        this.sysTypes = data.solutionsDTOs;
      }, error => { console.log(error) });
   }
 }
 
 
 
  selectPrecinct(precinctTypeId) {

   if (precinctTypeId === 'Choose...' || precinctTypeId === "") {
      this.precitTypes = [];
    }
    else {
    
 
    UtilService.preId = precinctTypeId;
    this._apiservice.getSolOnTypeForPrecinct(precinctTypeId)
        .subscribe((data: any) => {
        this.precitTypes = data.solutionsDTOs;
      }, error => { console.log(error) });
   }
 }
 
 

 
 
 
 
 
 selectSolution(solutionId) {

   if (solutionId === 'Choose...' || solutionId === "") {
      this.Locals = [];
    }
    else {
    UtilService.soluId = solutionId;
  this._apiservice.getLocOnTypeForSystem(solutionId)
        .subscribe((data: any) => {
         this.Locals = data;
      }, error => { console.log(error) });
   }
 }
  
  
 
  
  
  
  
  
 
}
