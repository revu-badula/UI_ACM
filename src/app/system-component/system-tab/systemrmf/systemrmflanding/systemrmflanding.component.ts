import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../../../apiservice.service';
import { UtilService } from '../../../../util.service';
import { Router, ActivatedRoute } from '@angular/router';
import { APP_CONFIG } from '../../../../app.config';
import { DialogService } from '../../../../dialog.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-systemrmflanding',
  templateUrl: './systemrmflanding.component.html',
  styleUrls: ['./systemrmflanding.component.css']
})
export class SystemrmflandingComponent implements OnInit {

  
  public loading: boolean = false;
  public showEdit: boolean = true;
  public p: number = 1;
  public desc: boolean = false;
  public name:boolean=false;
  public showPagination:boolean=false;
  public rmf:any;
  public appId:any;
  constructor(private _apiservice: ApiserviceService,
    private utilService: UtilService, private route: ActivatedRoute, private router: Router,
    private dialogService: DialogService,private httpClient:HttpClient) { 
      sessionStorage.removeItem("systemRmfId");

    }

  ngOnInit() {
    this.getAppId();
  }

  getAppId() {
    this.loading = true;
    this._apiservice.viewApplication(sessionStorage.getItem('systemName'))
      .subscribe((data: any) => {
        this.loading = false;
        this.appId=data.applicationViewDTO.applicationId;
        this.getRmfData();
      }, error => {
        this.loading=false;
        console.log(error);
      });
  }
  getRmfData()
  {
    this.loading=false;
    let url = APP_CONFIG.getAppRMFs;
    this.httpClient.get(url+"?"+"systemId="+this.appId)
    .subscribe((data:any)=>{
      this.loading=false;
      this.rmf=data;
      this.showPagination=true;
    },error => {
      this.loading=false;
      console.log(error);
    })
  }

  goTo() {
    sessionStorage.setItem("rmfdisabled","true");
    this.router.navigate(['/system/tab2/rmf/tabrmf/rmfStart']);

  }
  showPlus() {
    this.showEdit = false;
  }

  getAudit(value:any)
  {
    sessionStorage.setItem("systemRmfId",value);
    this.router.navigate(['/system/tab2/rmf/tabrmf/rmfStart']);
  }

}
