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
  selector: 'app-report-legal',
  templateUrl: './report-legal.component.html',
  styleUrls: ['./report-legal.component.css']
})
export class ReportLegalComponent implements OnInit {

  public displayData: number;
  public Localities: any;
  public Locals: any;
  public p: number = 1;
  public desc: boolean = false;
  public names: any;
  public showLeg: boolean = false;
  sysTypes: any;
  precinctTypes: any;
  systemTypes: any;
  color: String;
  public showText: any;
  public editForm: boolean = true;
  public loading: boolean = false;
  public locality:any;
  public systems:any;

  constructor(private _apiservice: ApiserviceService,
    private http: Http, private modalService: NgbModal, private utilservice: UtilService,
    private router: Router) {


  }

  ngOnInit() {


    this.getLocForMous();
    this.getSysForMous();

  }
  getColor() {
    return this.color === 'online' ? '#ffffff' : 'white';
  }
  getOpacity() {
    return this.color === 'online' ? 0.8 : 1;
  }





  getLocForMous() {
    this.showLeg = true;
    this.Localities = [];
    this.loading = true;
    this._apiservice.getLocForMous().
      subscribe((data: any) => {
        this.loading = false;
        this.Localities = data;
      }, error => {
        this.loading = false;
        console.log(error);

      }


      );

  }

  getSysForMous() {
    this.loading = true;
    this.Localities = [];

    this._apiservice.getSysForMous().
      subscribe((data: any) => {
        this.loading = false;
        this.Localities = data;
      }, error => {
        this.loading = false;
        console.log(error);

      }


      );


  }
  getLoc(event)
  {
    if(event.target.checked)
    {
      this.getLocForMous();
    }
  }
  getSys(event)
  {
    if(event.target.checked)
    {
      this.getSysForMous();
    }
  }

}
