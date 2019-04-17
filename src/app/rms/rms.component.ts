import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from 'app/app.config';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'app/alert.service';

@Component({
  selector: 'app-rms',
  templateUrl: './rms.component.html',
  styleUrls: ['./rms.component.css']
})
export class RmsComponent implements OnInit {

  public showData: boolean;
  public process: any;
  // public subscription: Subscription;
  // public message:any;
  // public show:boolean=false;
  constructor(private httpClient: HttpClient, private router: Router,private alertService:AlertService) {
    sessionStorage.removeItem("rmfSrcId");
    sessionStorage.removeItem("rmfGrpId");
    // this.subscription=this.alertService.getChildData()
    // .subscribe((data:any) =>{
    
    // });

  }

  ngOnInit() {
  }
  setRoutedComponent(value: any) {
    if (value.router.url === '/rms/rmsSrt') {
      if (this.showData) {
      }
      else {
        this.showData = false;
      }
    }
    else if(value.router.url === '/rms/rmsoverview') {
      // if(this.showData){
      
      // }
      // else{
        this.showData = true;
        this.getFamilies();
      // }
    }

  }


  getFamilies() {

    let id = +sessionStorage.getItem("rmfGrpId");
    let url = APP_CONFIG.getRMFProcess;
    this.process = [];
    this.httpClient.get(url + "?" + "rmfGrpId=" + id)
      .subscribe((data: any) => {
        this.process = data;
      }, error => {
        console.log(error)
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
}

}
