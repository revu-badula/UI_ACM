import { Component, OnInit, HostListener } from '@angular/core';
import {APP_CONFIG} from '../app.config';
import {ApiserviceService} from '../apiservice.service';
import {Http, HttpModule, Headers, RequestOptions} from '@angular/http';
import { Device ,Server} from '../data_modelDeviceInventory';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Location} from '@angular/common';
import { UtilService } from '../util.service';
import {ActivatedRoute, Params } from  '@angular/router';
import { IMyDate, IMyDpOptions } from 'mydatepicker';

import * as moment from 'moment';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-update-device',
  templateUrl: './update-device.component.html',
  styleUrls: ['./update-device.component.css'],
  providers: [ApiserviceService],
})
export class UpdateDeviceComponent implements OnInit {
  device: Device;
  public deviceData: any;
appId:number;
  public getDeviceData: any;
  public hostName: any;
  showForm:boolean = true;
  isLol:boolean = false;
  
  color: String;
  serverContact:Server;
   
   public startDate:any;
   renDate:any;
   public endDate:any;
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd'
  };
  deviceId:number;
   approveDate: any;
  dueDate: any;
  
    //public selectDate: IMyDate = null;
  //public renewalDate: IMyDate = null;
  public licenceStartDate: IMyDate = null;
  
  constructor(private _apiservice: ApiserviceService,private activatedRoute:ActivatedRoute,private datepipe: DatePipe, private  http: Http, private modalService: NgbModal, private _location: Location, private utilservice: UtilService) { 
    this.device = new Device();
    this.serverContact = new Server();
     this.device.serverContactDTOs = [] as Server[];
    
  
    
  }

  ngOnInit() {
  this.activatedRoute.params.subscribe(params => {
  this.deviceId = params ['id'];
  });
    this.getDBServer(this.deviceId);
  }
  
   open(content){
     this.modalService.open(content);
  }
  
    changeForm(){
    if(this.showForm === false){
      this.showForm = true; 
    }
    else{
      this.showForm = false;
    }
  }
  
  getDBServer(id){
 
    this._apiservice.getDBServer(id)
    .subscribe((data:any) => {
      console.log(data);
     this.device = data;
     for(let i=0;i<data.serverContactDTOs.length;i++)
     {
     this.serverContact=data.serverContactDTOs[i];
     }
      
   
    if(this.device.licenseStartDt === null)
      {
        this.startDate = {date:null};
      }
      else{
      let d = new Date(this.device.licenseStartDt);
      let day = d.getDate();
      let month = d.getMonth()+1;
      let year = d.getFullYear();
      this.startDate = {date:{year: year, month: month, day: day}};
      }
      
      
       if(this.device.licenseEndDt === null)
      {
        this.endDate = {date:null};
      }
      else{
      let d = new Date(this.device.licenseEndDt);
      let day = d.getDate();
      let month = d.getMonth()+1;
      let year = d.getFullYear();
      this.endDate = {date:{year: year, month: month, day: day}};
      }
      
         if(this.device.licenseRenewDt === null)
      {
        this.renDate = {date:null};
      }
      else{
      let d = new Date(this.device.licenseRenewDt);
      let day = d.getDate();
      let month = d.getMonth()+1;
      let year = d.getFullYear();
      this.renDate = {date:{year: year, month: month, day: day}};
      }
      
      
      
      
      console.log(this.device);   
    },error => console.log(error));
  }
  
  backClicked() {
    this._location.back();
  }
  
  editorGroup(): void {
  this.showForm = false; 
  this.isLol = true;
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
    
    

  
  
  updateDevice(){
     this.device.databaseId = this.deviceId;
    let url = APP_CONFIG.updateDBServerInfo;
     	
    console.log(this.device);
       
          
    this.device.serverContactDTOs.push(this.serverContact);
    console.log(this.device);
     this.http.post(url, this.device).subscribe((data: any) => {
              console.log("inside http");
              console.log(data);
            }, error => console.log(error));
  
  }
  
  @HostListener('window:scroll', [])
  onWindowScroll() {

    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 100) {
      this.color = 'online';
      console.log('You are 100px from the top to bottom');
    } else {
      this.color = 'offline';
      console.log('You are 500px from the top to bottom');
    }

  }

   getColor() {
    return this.color === 'online' ? '#ffffff' : 'white';
  }

  getOpacity() {
    return this.color === 'online' ? 0.8 : 1;
  }

}
