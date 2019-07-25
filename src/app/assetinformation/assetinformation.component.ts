import { Component, OnInit, Input } from '@angular/core';
import { APP_CONFIG } from '../app.config';
import { IMyDate, IMyDpOptions } from 'mydatepicker';
import { Device, Server } from '../data_modelDeviceInventory';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-assetinformation',
  templateUrl: './assetinformation.component.html',
  styleUrls: ['./assetinformation.component.css']
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
  renDate: any;
  public endDate: any;
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd'
  };
  approveDate: any;
  dueDate: any;
  public licenceStartDate: IMyDate = null;
  @Input() deviceId: number;
  constructor(public sideNavService: AlertService, private httpClient: HttpClient) {
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

}
