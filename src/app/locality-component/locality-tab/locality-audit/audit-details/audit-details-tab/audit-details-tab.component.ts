import { ApiserviceService } from "../../../../../apiservice.service";
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UtilService } from "../../../../../util.service";
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-audit-details',
  templateUrl: './audit-details-tab.component.html',
  providers: [ApiserviceService]
})
export class AuditDetailsTab implements OnInit {
  public mainData: any;
  public updatedTime: any;
  public disabled: boolean;
  public updatedBy: any;
  constructor(private _apiservice: ApiserviceService,
    private utilService: UtilService, private route: ActivatedRoute, config: NgbProgressbarConfig) {
    this.disabled = UtilService.disabled;
    this.getAppId();

    config.max = 10;
    config.striped = true;
    config.animated = true;
    config.type = 'success';
    config.height = '30px';
  }

  ngOnInit() {

  }

  getAppId() {

    this._apiservice.viewApplication(localStorage.getItem('localityName'))
      .subscribe((data: any) => {
        //this.appAudit.applicationID = data.applicationViewDTO.applicationId;
        this.mainData = data.applicationViewDTO.acronym;
        this.updatedBy = data.applicationViewDTO.updatedBy;
        let d = new Date(data.applicationViewDTO.updatedTime);
        //this.appAuditDTOs = data.applicationViewDTO.appAuditDTOs;
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        this.updatedTime = month + "/" + day + "/" + year;
      }, error => console.log(error));

  }

  status: boolean = false;
clickEvent(){
    this.status = !this.status;       
}

}
