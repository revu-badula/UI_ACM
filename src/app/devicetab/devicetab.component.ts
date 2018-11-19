import { Component, OnInit } from '@angular/core';
import { APP_CONFIG } from '../app.config';
import { ApiserviceService } from '../apiservice.service';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { Device, Server } from '../data_modelDeviceInventory';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../util.service';
import { FilterPipe } from '../convertDate.pipe';
import { DatePipe } from '@angular/common';
import { IMyDate, IMyDpOptions } from 'mydatepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-devicetab',
  templateUrl: './devicetab.component.html',
  styleUrls: ['./devicetab.component.css']
})
export class DevicetabComponent implements OnInit {

  displayDevices: any;
  device: Device;
  public p: number = 1;
  public loading: boolean = false;
  public desc = false;
  public des = false;
  public crtdt: boolean = false;
  public modifiedDt: boolean = false;
  public rendt: boolean = false;
  public updtBy: boolean = false;
  constructor(private _apiservice: ApiserviceService, private http: Http, private modalService: NgbModal, private utilservice: UtilService, private datepipe: DatePipe) {
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

      }, error => {
        this.loading = false;
        console.log(error);
      }
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







  handleSorting() {

    if (!this.des) {
      this.displayDevices.sort(this.doAs);
      this.des = true;
    }
    else {
      this.displayDevices.sort(this.doDs);
      this.des = false;
    }

  }

  doAs(a, b) {


    if (a.productName > b.productName) {
      return -1;
    } else if (a.productName < b.productName) {
      return 1;
    }
    return 0;
  }

  doDs(a, b) {

    if (a.productName < b.productName) {
      return -1;
    } else if (a.productName > b.productName) {
      return 1;
    }
    return 0;
  }


  handleSort2(value) {
    if (!this.crtdt) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.displayDevices.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.crtdt = true;
    }
    else {
      let orderByValue = value;
      this.displayDevices.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.crtdt = false;
    }


  }

  handleSort3(value) {
    if (!this.modifiedDt) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.displayDevices.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.modifiedDt = true;
    }
    else {
      let orderByValue = value;
      this.displayDevices.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.modifiedDt = false;
    }


  }

  handleSort4(value) {
    if (!this.rendt) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.displayDevices.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.rendt = true;
    }
    else {
      let orderByValue = value;
      this.displayDevices.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.rendt = false;
    }


  }

  handleSort5(value) {
    if (!this.updtBy) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.displayDevices.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.updtBy = true;
    }
    else {
      let orderByValue = value;
      this.displayDevices.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.updtBy = false;
    }


  }









}
