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
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css'],
  providers: [ApiserviceService],
})
export class DeviceComponent implements OnInit {
  public showForm: boolean = false;
  device: Device;
  getDevice: Device;
  displayDevices: any;
    public desc = false;
      public p: number = 1;
  renewalDate: any;
  serverContact:Server;
  public startDate:any;
    public endDate:any;
    isLol:boolean = false;
    renDate:any;
   public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd'
  };
  constructor(private _apiservice: ApiserviceService, private  http: Http, private modalService: NgbModal, private utilservice: UtilService,private datepipe: DatePipe) { 
    this.device = new Device();
    this.getDevice = new Device();
      this.device.serverContactDTOs = [] as Server[];
       	this.serverContact = new Server();
  }

  ngOnInit() {
    //for(let i = 1;i <= UtilService.noIds;i++){
      //this.getDBServer(1);
      this.getDatabases();
    //}
  }
  
  changeForm(){
    if(this.showForm === false){
      this.showForm = true; 
    }
    else{
      this.showForm = false;
    }
  }
  
   open(content){
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
       console.log(this.displayDevices);
      }, error => {
     
        console.log(error);}
      );
  }
  
   editorGroup(): void {
  this.showForm = false; 
  this.isLol = true;
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
  
  
   getStartDate(value)
    {
      if (value.formatted === "") {
        this.device.licenseStartDt=null;
      }
      else {
        let d = value.formatted;
        let latest_date =this.datepipe.transform(d, 'yyyy-MM-dd');
        this.device.licenseStartDt = moment(latest_date).format();
      }
      
    }
  
     getEndDate(value)
    {
      if (value.formatted === "") {
        this.device.licenseEndDt=null;
      }
      else {
        let d = value.formatted;
        let latest_date =this.datepipe.transform(d, 'yyyy-MM-dd');
        this.device.licenseEndDt = moment(latest_date).format();
      }
      
    }
    
    
        getRenDate(value)
    {
      if (value.formatted === "") {
        this.device.licenseRenewDt=null;
      }
      else {
        let d = value.formatted;
     
        let latest_date =this.datepipe.transform(d, 'yyyy-MM-dd');
        this.device.licenseRenewDt = moment(latest_date).format();
      }
      
    }
    
  
  
  
  
  
  
  
  submitDevice(){
    console.log("inside submit");
    let url = APP_CONFIG.saveDBServerInfo;
   
console.log(this.serverContact);
   	console.log(this.device.serverContactDTOs);
    this.device.serverContactDTOs.push(this.serverContact);
      console.log(JSON.stringify(this.device));
   this.http.post(url, this.device).subscribe((data: any) => {
     console.log(JSON.stringify(this.device));
             
              console.log(data);
            }, error => console.log(error));
    
  }

}

 
 
  /*getStartDate(value)
    {
      if (value.formatted === "") {
        this.device.licenseStartDt=null;
      }
      else {
        let d = value.formatted;
    
        let latest_date =this.datepipe.transform(d, 'yyyy-MM-dd');
          this.device.licenseStartDt = moment(latest_date).format();
      }
      
    }*/



 /*let d = new Date(this.solution.certDt);
        this.selectDate = {
           year: d.getFullYear(),
          month: d.getMonth() + 1,
          day: d.getDate()
        }*/