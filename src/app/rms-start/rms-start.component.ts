import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../app.config';
import { Router } from '@angular/router';
import { AlertService } from 'app/alert.service';

@Component({
  selector: 'app-rms-start',
  templateUrl: './rms-start.component.html',
  styleUrls: ['./rms-start.component.css']
})
export class RmsStartComponent implements OnInit {
  public loading: boolean;
  public RMF: any;
  public rmfSrcId:any;
  public RMFGroup:any;
  public rmfGrpId:any;
  constructor(private httpClient: HttpClient,private router:Router,private alertService:AlertService) { 
    this.rmfSrcId=+sessionStorage.getItem("rmfSrcId");
      //this.policyGrpId=UtilService.policyGrpId;
      this.rmfGrpId=+sessionStorage.getItem("rmfGrpId");
      if(this.rmfSrcId != 0)
      this.selectDefinitive(this.rmfSrcId);
  }

  ngOnInit() {
    this.getDropdown();
  }

  getDropdown() {

    let url = APP_CONFIG.getRMFSrc;
    this.loading = true;
    this.httpClient.get(url)
      .subscribe((data: any) => {
        this.loading = false;
        this.RMF=data;
        //this.alertService.emitChange(this.RMF);
      }, error => {
        this.loading = false;
        console.log(error);
      })
  }

  selectDefinitive(value:any)
  {
    if(value === ""){
      this.RMFGroup=[];
    }
    else{
      let url=APP_CONFIG.getRMFGrps;
      this.loading=true;
      sessionStorage.setItem("rmfSrcId",value);
      this.httpClient.get(url+"?"+"rmfSrcId="+value)
      .subscribe((data:any)=>{
        this.loading=false;
        this.RMFGroup=data;
      },error=>{
        this.loading=false;
        console.log(error);
      })
    }
  }

  selectType(value:any)
  {
    if(value === ""){}
    else{
      sessionStorage.setItem("rmfGrpId", value);
      this.router.navigate(['/rms/rmsoverview']);

    }
  }

}
