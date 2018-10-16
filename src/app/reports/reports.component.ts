import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Http } from '@angular/http';
import { UtilService } from '../util.service';
import { IMyDate, IMyDpOptions } from 'mydatepicker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


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
    systemTypes: any;
    sysTypes:any;
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

    if (systemTypeId === 'Choose...' || systemTypeId === "") {
      
      this.sysTypes= [];
    }
    else {
 
      UtilService.sysId = systemTypeId;
      this._apiservice.getSolOnTypeForReports(systemTypeId)
        .subscribe((data: any) => {
          this.sysTypes = data.solutionDTOs;
        }, error => { console.log(error) });
    }



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



}
