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
  color: String;
  hostingnames: any;
  public showTable:boolean=false;
  public precinctTypeId: number;
  public modelSname: string;
  public solutionId: number;
  public appId: any;
public precitTypes:any;
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
      this.loading=true;
    UtilService.soluId = solutionId;
  this._apiservice.getLocOnTypeForSystem(solutionId)
        .subscribe((data: any) => {
          this.loading=false;
          this.showTable=true;
         this.Locals = data;
      }, error => { 
        this.loading=false;
        console.log(error) });
   }
 }
  
  
 
  
  
  
  
  
 
}
