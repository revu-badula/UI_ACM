import { Component, OnInit } from '@angular/core';
import {APP_CONFIG} from '../app.config';
import {ApiserviceService} from '../apiservice.service';
import {Http, HttpModule, Headers, RequestOptions} from '@angular/http';
import { Device,Server } from '../data_modelDeviceInventory';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../util.service';
import { FilterPipe} from '../convertDate.pipe';
import { DatePipe } from '@angular/common';
import { IMyDate, IMyDpOptions } from 'mydatepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-devicetab',
  templateUrl: './devicetab.component.html',
  styleUrls: ['./devicetab.component.css']
})
export class DevicetabComponent implements OnInit {

  displayDevices:any;
    device: Device;
      public p: number = 1;
  public loading: boolean = false;
  public desc = false;
 constructor(private _apiservice: ApiserviceService, private  http: Http, private modalService: NgbModal, private utilservice: UtilService,private datepipe: DatePipe) {
  this.device = new Device();

  }

  ngOnInit() {
      this.getDatabases();
  }
  
 
  
    getDatabases() {
       this.loading = true;
this._apiservice.getDatabases()
      .subscribe((data: any) => {
           this.loading = false;
       this.displayDevices = data;
       console.log(this.displayDevices);
      }, error => {
        this.loading = false;
        console.log(error);}
      );
  }
  
  
  
   handleSort() {

    if (!this.desc) {
      this.displayDevices.sort(this.doAsc);
      this.desc = true;
    }
    else {
      this.displayDevices.sort(this.doDsc);
      this.desc = false;
    }

  }

  doAsc(a, b) {
    

    if (a.hostName > b.hostName) {
      return -1;
    } else if (a.hostName < b.hostName) {
      return 1;
    }
    return 0;
  }

  doDsc(a, b) {
   
    if (a.hostName < b.hostName) {
      return -1;
    } else if (a.hostName > b.hostName) {
      return 1;
    }
    return 0;
  }
  
  
  

}
