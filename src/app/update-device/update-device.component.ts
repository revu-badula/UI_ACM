import { Component, OnInit, HostListener } from '@angular/core';
import {APP_CONFIG} from '../app.config';
import {ApiserviceService} from '../apiservice.service';
import {Http, HttpModule, Headers, RequestOptions} from '@angular/http';
import { Device ,Server} from '../data_modelDeviceInventory';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Location} from '@angular/common';
import { UtilService } from '../util.service';
import {ActivatedRoute, Params } from  '@angular/router';

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
  color: String;
  serverContact:Server;

  deviceId:number;
  
  constructor(private _apiservice: ApiserviceService,private activatedRoute:ActivatedRoute, private  http: Http, private modalService: NgbModal, private _location: Location, private utilservice: UtilService) { 
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
  
  getDBServer(id){
    this._apiservice.getDBServer(id)
    .subscribe((data:any) => {
      console.log(data);
     this.device = data;
     for(let i=0;i<data.serverContactDTOs.length;i++)
     {
     this.serverContact=data.serverContactDTOs[i];
     }
      console.log(this.device);   
    },error => console.log(error));
  }
  
  backClicked() {
    this._location.back();
  }
  
  editorGroup(): void {
  this.showForm = false; 
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
