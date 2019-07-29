import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { APP_CONFIG } from '../app.config';
import { IMyDate, IMyDpOptions } from 'mydatepicker';
import { Device, Server } from '../data_modelDeviceInventory';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../alert.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { PhonePipe } from 'app/locality-component/phone-pipe';
import { Http } from '@angular/http';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-assetinformation',
  templateUrl: './assetinformation.component.html',
  styleUrls: ['./assetinformation.component.css'],
  providers: [PhonePipe],
})
export class AssetinformationComponent implements OnInit {

  public device: Device;
  public deviceData: any;
  public appId: number;
  public getDeviceData: any;
  public hostName: any;
  public showForm: boolean = true;
  public isLol: boolean = false;
  public loading: boolean = false;
  public color: String;
  public serverContact: Server;
  public serverContact1: Server;
  public serverEnvs: any;
  public startDate: any;
  public showBtt: boolean = true;
  @ViewChild('content') content: TemplateRef<any>;
  renDate: any;
  config: any = {
    height: 250,
    width: 1180,
    theme: 'modern',
    plugins: 'textcolor wordcount colorpicker textpattern link',
    toolbar: 'bold italic strikethrough forecolor backcolor fontsizeselect | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
    branding: false,
    menubar: true,
    statusbar: false
  };
  public endDate: any;
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd'
  };
  approveDate: any;
  dueDate: any;
  public licenceStartDate: IMyDate = null;
  @Input() deviceId: number;
  constructor(public sideNavService: AlertService, private modalService: NgbModal,
    private httpClient: HttpClient,
    private phone: PhonePipe,
    private activatedRoute: ActivatedRoute, private datepipe: DatePipe,
    private http: Http, private _location: Location) {
    this.device = new Device();
    this.serverContact = new Server();
    this.serverContact1 = new Server();
  }

  ngOnInit() {
    let url = APP_CONFIG.getDBServer + "?a=" + this.deviceId;
    this.httpClient.get(url)
      .subscribe((data: any) => {
        this.device = data;
        data.serverContactDTOs.filter((item: any) => {
          if (item.isPrimary === true) {
            this.serverContact = item;
          }
        });
        data.serverContactDTOs.filter((item: any) => {

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
      }, error => {
        console.log(error);
      })

  }

  getPhoneNumbers(value: any) {
    this.serverContact.phoneNumber = this.phone.transform(value);
  }


  getServerEnvs() {
    let url = APP_CONFIG.getServerEnvs;
    this.loading = true;
    this.httpClient.get(url)
      .subscribe((data: any) => {
        this.loading = false;
        this.serverEnvs = data;
      }, error => {
        this.loading = false;
        console.log(error)
      });
  }

  getPhoneNumber(e: any, value: any) {

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




  getPhoneNumber1(e: any, value: any) {

    let key = e.charCode || e.keyCode || 0;
    if (key !== 8 && key !== 9) {
      if (value.length === 3) {
        this.serverContact1.phoneNumber = value + '-';
      }
      if (value.length === 7) {
        this.serverContact1.phoneNumber = value + '-';
      }

    }

    return (key == 8 || key == 9 || key == 17 || key == 46 || (key >= 48 && key <= 57) || (key >= 96 && key <= 105));

  }


















  open(content: any) {
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



  backClicked() {
    this._location.back();
  }

  editorGroup(): void {
    this.showForm = false;
    this.isLol = true;
    this.showBtt = false;
    this.getServerEnvs();
  }


  getStartDate(value: any) {
    if (value.formatted === "") {
      this.device.licenseStartDt = null;
    }
    else {
      let d = value.formatted;

      let latest_date = this.datepipe.transform(d, 'yyyy-MM-dd');
      this.device.licenseStartDt = moment(latest_date).format();
    }

  }

  getEndDate(value: any) {
    if (value.formatted === "") {
      this.device.licenseEndDt = null;
    }
    else {
      let d = value.formatted;

      let latest_date = this.datepipe.transform(d, 'yyyy-MM-dd');
      this.device.licenseEndDt = moment(latest_date).format();
    }

  }



  getRenDate(value: any) {
    if (value.formatted === "") {
      this.device.licenseRenewDt = null;
    }
    else {
      let d = value.formatted;

      let latest_date = this.datepipe.transform(d, 'yyyy-MM-dd');
      this.device.licenseRenewDt = moment(latest_date).format();
    }

  }






  getNumber(value: any) {
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


  getNumber1(value: any) {
    if (value.length === 10) {

      let data = value.slice(0, 3);
      let pn = data + '-';
      let d2 = value.slice(3, 6);
      let pn2 = d2 + '-';
      let d3 = value.slice(6, 10);
      let phm = pn + pn2 + d3;
      this.serverContact1.phoneNumber = phm;
    }
    else {
      this.serverContact1.phoneNumber = value;
    }
  }







  updateDevice() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.loading = true;
    this.device.databaseId = this.deviceId;
    let url = APP_CONFIG.updateDBServerInfo;
    this.device.updatedBy = Cookie.get('userName');
    this.serverContact.updatedBy = Cookie.get('userName');
    this.serverContact1.updatedBy = Cookie.get('userName');
    this.http.post(url, this.device).subscribe((data: any) => {
      this.loading = false;
      this.modalService.open(this.content, ngbModalOptions);


    }, error => {
      this.loading = false;
      console.log(error);
    });

  }

}
