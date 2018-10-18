import { Component, OnInit, HostListener, ViewChild, TemplateRef } from '@angular/core';
import { APP_CONFIG } from '../app.config';
import { ApiserviceService } from '../apiservice.service';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { Device, Server } from '../data_modelDeviceInventory';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { UtilService } from '../util.service';
import { ActivatedRoute, Params } from '@angular/router';
import { IMyDate, IMyDpOptions } from 'mydatepicker';
import { PhonePipe } from '../locality-component/phone-pipe';
import { Cookie } from 'ng2-cookies';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-update-device',
  templateUrl: './update-device.component.html',
  styleUrls: ['./update-device.component.css'],
  providers: [ApiserviceService, PhonePipe],
})
export class UpdateDeviceComponent implements OnInit {
  device: Device;
  public deviceData: any;
  appId: number;
  public getDeviceData: any;
  public hostName: any;
  showForm: boolean = true;
  isLol: boolean = false;
  public loading: boolean = false;
  color: String;
  serverContact: Server;
  serverContact1: Server;

  public startDate: any;
  public showBtt: boolean = true;
  renDate: any;
  public endDate: any;
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd'
  };
  deviceId: number;
  approveDate: any;
  dueDate: any;
  @ViewChild('content') content: TemplateRef<any>;
  //public selectDate: IMyDate = null;
  //public renewalDate: IMyDate = null;
  public licenceStartDate: IMyDate = null;

  constructor(private phone: PhonePipe, private _apiservice: ApiserviceService, private activatedRoute: ActivatedRoute, private datepipe: DatePipe, private http: Http, private modalService: NgbModal, private _location: Location, private utilservice: UtilService) {
    this.device = new Device();
    this.serverContact = new Server();
    this.serverContact1 = new Server();
    this.device.serverContactDTOs = [] as Server[];



  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.deviceId = params['id'];
    });
    this.getDBServer(this.deviceId);
  }
  getPhoneNumbers(value) {
    this.serverContact.phoneNumber = this.phone.transform(value);
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


















  open(content) {
    this.modalService.open(content);
  }

  changeForm() {
    if (this.showForm === false) {
      this.showForm = true;
    }
    else {
      this.showForm = false;
    }
  }

  getDBServer(id) {
    this.loading = true;
    this._apiservice.getDBServer(id)
      .subscribe((data: any) => {
        this.device = data;
        this.loading = false;

        data.serverContactDTOs.filter(item => {

          if (item.isPrimary === true) {
            this.serverContact = item;
          }


        });
        data.serverContactDTOs.filter(item => {

          if (item.isPrimary === false) {
            this.serverContact1 = item;
          }


        });

        if (this.device.licenseStartDt === null) {
          this.startDate = { date: null };
        }
        else {
          let d = new Date(this.device.licenseStartDt);
          let day = d.getDate();
          let month = d.getMonth() + 1;
          let year = d.getFullYear();
          this.startDate = { date: { year: year, month: month, day: day } };
        }


        if (this.device.licenseEndDt === null) {
          this.endDate = { date: null };
        }
        else {
          let d = new Date(this.device.licenseEndDt);
          let day = d.getDate();
          let month = d.getMonth() + 1;
          let year = d.getFullYear();
          this.endDate = { date: { year: year, month: month, day: day } };
        }

        if (this.device.licenseRenewDt === null) {
          this.renDate = { date: null };
        }
        else {
          let d = new Date(this.device.licenseRenewDt);
          let day = d.getDate();
          let month = d.getMonth() + 1;
          let year = d.getFullYear();
          this.renDate = { date: { year: year, month: month, day: day } };
        }




        //console.log(this.device);
        this.loading = false;
      }, error => console.log(error));
  }

  backClicked() {
    this._location.back();
  }

  editorGroup(): void {
    this.showForm = false;
    this.isLol = true;
    this.showBtt = false;
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
else{
  this.serverContact.phoneNumber = value;
}
  }


  getNumber1(value) {
    if (value.length === 10) {
    
      let data = value.slice(0, 3);
      let pn = data + '-';
      let d2 = value.slice(3, 6);
      let pn2 = d2 + '-';
      let d3 = value.slice(6, 10);
      let phm = pn + pn2 + d3;
      this.serverContact1.phoneNumber = phm;
    }
else{
  this.serverContact1.phoneNumber = value;
}
  }







  updateDevice() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.loading=true;
    this.device.databaseId = this.deviceId;
    let url = APP_CONFIG.updateDBServerInfo;
    this.device.updatedBy = Cookie.get('userName');
    this.serverContact.updatedBy=Cookie.get('userName');
    this.serverContact1.updatedBy=Cookie.get('userName');
    this.http.post(url, this.device).subscribe((data: any) => {
      this.loading=false;
      this.modalService.open(this.content, ngbModalOptions);


    }, error => {
      this.loading=false;
      console.log(error);
    });

  }

  @HostListener('window:scroll', [])
  onWindowScroll() {

    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 100) {
      this.color = 'online';
    } else {
      this.color = 'offline';
    }

  }

  getColor() {
    return this.color === 'online' ? '#ffffff' : 'white';
  }

  getOpacity() {
    return this.color === 'online' ? 0.8 : 1;
  }

}
