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

  public Locals: any;
  public p: number = 1;
  public desc: boolean = false;
  public names: any;
  sysTypes: any;
  precinctTypes: any;
  systemTypes: any;

  public loading: boolean = false;
  editableForm: boolean = true;
  public showButton: boolean = true;
  color: String;
  public devices: number;
  public legal: number;
  public solution: number;
  public vendor: number;

  public isClick: boolean = true;
  public showBuck: boolean = true;
  public hostType: any;
  public showPlus: boolean = true;
  public reports: any;


  constructor(private _apiservice: ApiserviceService,
    private http: Http, private modalService: NgbModal, private utilservice: UtilService,
    private router: Router) {


  }

  ngOnInit() {

    //this.getLocalityTotal();
    this.getAll();
  }

  getLocalityTotal() {
    this.loading = true;
    this._apiservice.getLocalityTotal().
      subscribe((data: any) => {
        this.loading = false;
        this.displayData = data;
      }, error => {
        this.loading = false;
        console.log(error);

      }


      );

  }




  getColor() {
    return this.color === 'online' ? '#ffffff' : 'white';
  }
  getOpacity() {
    return this.color === 'online' ? 0.8 : 1;
  }



  getAll() {
    this.loading = true;
    this._apiservice.getAllTotals().
      subscribe((data: any) => {
        this.loading = false;
        this.reports = data;
        this.devices = data[0];
        this.solution = data[1];
        this.vendor = data[2];
        this.legal = data[3];
      }, error => {
        this.loading = false;
        console.log(error);

      }


      );

  }

}
