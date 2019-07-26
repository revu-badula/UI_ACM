import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../app.config';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.css']
})
export class AssetDetailComponent implements OnInit {

  public deviceId: any;
  public applications: any;
  public incidents: any;
  public loading:boolean;
  constructor(public sideNavService: AlertService, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
    this.activatedRoute.params.subscribe(params => {
      this.deviceId = params['id'];

    });

  }

  ngOnInit() {
    this.getPageData();
  }

  getPageData() {
    let url = APP_CONFIG.getServerDetails + "/" + this.deviceId;
    this.loading=true;
    this.httpClient.get(url)
      .subscribe((data: any) => {
        this.applications = data.applicationDTOs;
        this.incidents = data.incidentManagementDTOs;
        this.loading=false;
      }, error => {
        this.loading=false;
        console.log(error);
      });
  }
}
