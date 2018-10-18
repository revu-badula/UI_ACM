import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { APP_CONFIG } from '../app.config';
import { ApiserviceService } from '../apiservice.service';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { Device, Server } from '../data_modelDeviceInventory';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../util.service';
import { FilterPipe } from '../convertDate.pipe';
import { DatePipe } from '@angular/common';
import { IMyDate, IMyDpOptions } from 'mydatepicker';
import * as moment from 'moment';
import { PhonePipe } from '../locality-component/phone-pipe';
import { Cookie } from 'ng2-cookies';
import { Router } from '@angular/router';
@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css'],
  providers: [ApiserviceService, PhonePipe],
})
export class DeviceComponent implements OnInit {
  public showForm: boolean = false;
  device: Device;
  getDevice: Device;
  displayDevices: any;
  public desc = false;
  public p: number = 1;
  renewalDate: any;
  public loading: boolean = false;
  serverContact: Server;
  serverContact1: Server;
  public startDate: any;
  public endDate: any;
  isLol: boolean = false;
  renDate: any;
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd'
  };
  @ViewChild('content') content: TemplateRef<any>;
  constructor(private phone: PhonePipe, private _apiservice: ApiserviceService,
    private http: Http, private modalService: NgbModal, private utilservice: UtilService,
    private datepipe: DatePipe, private router: Router) {
    this.device = new Device();
    this.getDevice = new Device();
    this.device.serverContactDTOs = [];
    this.serverContact = new Server();
    this.serverContact1 = new Server();
  }

  ngOnInit() {
    //for(let i = 1;i <= UtilService.noIds;i++){
    //this.getDBServer(1);
    this.getDatabases();
    //}
  }

  changeForm() {
    if (this.showForm === false) {
      this.showForm = true;
    }
    else {
      this.showForm = false;
    }
  }













  open(content) {
    this.modalService.open(content);
  }

  /* getDBServer(id){
     this._apiservice.getDBServer(id)
     .subscribe((data:any) => {
       this.deviceData = data
       console.log(this.getDevice);
     },error => console.log(error));
   
   }*/
  getDatabases() {
    this._apiservice.getDatabases()
      .subscribe((data: any) => {
        this.displayDevices = data;

      }, error => {

        console.log(error);
      }
      );
  }

  editorGroup(): void {
    this.showForm = false;
    this.isLol = true;
  }


  redirect() {
    this.router.navigate(['/devicetab']);
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


  getStartDate(value) {
    if (value.formatted === "") {
      this.device.licenseStartDt = null;
    }
    else {
      let d = value.formatted;
      let latest_date = this.datepipe.transform(d, 'yyyy-MM-dd');
      this.device.licenseStartDt = moment(latest_date).format();
    }

  }

  getEndDate(value) {
    if (value.formatted === "") {
      this.device.licenseEndDt = null;
    }
    else {
      let d = value.formatted;
      let latest_date = this.datepipe.transform(d, 'yyyy-MM-dd');
      this.device.licenseEndDt = moment(latest_date).format();
    }

  }




  getNumber(value) {
    if (value.length === 10) {
      let data = value.slice(0, 3);
      let pn = data + '-';
      let d2 = value.slice(3, 6);
      let pn2 = d2 + '-';
      let d3 = value.slice(6, 10);
      let phm = pn + pn2 + d3;
      this.serverContact.phoneNumber = phm;
    }
    else {
      this.serverContact.phoneNumber = value;
    }

  }


  getNumber1(value) {
    if (value.length === 12) {
      this.serverContact1.phoneNumber = value;
    }
    else {
      let data = value.slice(0, 3);
      let pn = data + '-';
      let d2 = value.slice(3, 6);
      let pn2 = d2 + '-';
      let d3 = value.slice(6, 10);
      let phm = pn + pn2 + d3;
      this.serverContact1.phoneNumber = phm;
    }

  }

















  getRenDate(value) {
    if (value.formatted === "") {
      this.device.licenseRenewDt = null;
    }
    else {
      let d = value.formatted;

      let latest_date = this.datepipe.transform(d, 'yyyy-MM-dd');
      this.device.licenseRenewDt = moment(latest_date).format();
    }

  }








  submitDevice() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.loading = true;
    let url = APP_CONFIG.saveDBServerInfo;
    this.serverContact1.isPrimary = false
    this.serverContact.isPrimary = true
    this.serverContact.createdBy = Cookie.get('userName');
    this.serverContact1.createdBy = Cookie.get('userName');
    this.device.createdBy = Cookie.get('userName');
    this.device.serverContactDTOs.push(this.serverContact);
    this.device.serverContactDTOs.push(this.serverContact1);

    this.http.post(url, this.device).subscribe((data: any) => {
      this.loading = false;
      this.modalService.open(this.content, ngbModalOptions);
    }, error => {
      this.loading = false;
      console.log(error);
    });

  }





  getPhoneNumber(e, value) {

    let key = e.charCode || e.keyCode || 0;
    if (key !== 8 && key !== 9) {
      if (value.length === 3) {
        this.serverContact.phoneNumber = value + '-';
      }
      if (value.length === 7) {
        this.serverContact.phoneNumber = value + '-';
      }

    }

    return (key == 8 || key == 9 || key == 46 || (key >= 48 && key <= 57) || (key >= 96 && key <= 105));

  }


  getPhoneNumber1(e, value) {

    let key = e.charCode || e.keyCode || 0;
    if (key !== 8 && key !== 9) {
      if (value.length === 3) {
        this.serverContact1.phoneNumber = value + '-';
      }
      if (value.length === 7) {
        this.serverContact1.phoneNumber = value + '-';
      }

    }

    return (key == 8 || key == 9 || key == 46 || (key >= 48 && key <= 57) || (key >= 96 && key <= 105));

  }






















}
 /*let d = new Date(this.solution.certDt);
        this.selectDate = {
           year: d.getFullYear(),
          month: d.getMonth() + 1,
          day: d.getDate()
        }*/