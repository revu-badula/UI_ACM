import { Component, OnInit } from '@angular/core';
import {APP_CONFIG} from '../app.config';
import {ApiserviceService} from '../apiservice.service';
import {Http, HttpModule, Headers, RequestOptions} from '@angular/http';
import { Device,Server } from '../data_modelDeviceInventory';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../util.service';
import { FilterPipe} from '../convertDate.pipe';

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
  serverContact:Server;
  
  constructor(private _apiservice: ApiserviceService, private  http: Http, private modalService: NgbModal, private utilservice: UtilService) { 
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
  
  
  
  
  
  
  submitDevice(){
    console.log("inside submit");
    let url = APP_CONFIG.saveDBServerInfo;
   	/*if(this.device.serverContactDTOs === null) {
   		this.device.serverContactDTOs = [];
   	}*/
   	//this.serverContact = new Server();
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


 /*let d = new Date(this.solution.certDt);
        this.selectDate = {
           year: d.getFullYear(),
          month: d.getMonth() + 1,
          day: d.getDate()
        }*/