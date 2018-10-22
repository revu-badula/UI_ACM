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
  selector: 'app-report-device',
  templateUrl: './report-device.component.html',
  styleUrls: ['./report-device.component.css']
})
export class ReportDeviceComponent implements OnInit {
  color: String;
  public desc:boolean=false;
  public p:number=1;
  public devices:any;
   constructor(private _apiservice: ApiserviceService,
    private http: Http, private modalService: NgbModal, private utilservice: UtilService,
    private router: Router)  { }

  ngOnInit() {
  this.showDevice();
  }
  getColor() {
    return this.color === 'online' ? '#ffffff' : 'white';
  }
  getOpacity() {
    return this.color === 'online' ? 0.8 : 1;
  }
  showDevice(){
  this._apiservice.getLocForDevices().
      subscribe((data: any) => {
        this.devices = data;
      }, error => {
        console.log(error);

      }


      );
  }
}
