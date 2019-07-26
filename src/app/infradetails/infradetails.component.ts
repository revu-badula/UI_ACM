import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../app.config';
import { AlertService } from 'app/alert.service';
import { InfraStructureDTO } from 'app/review_DataModel';
@Component({
  selector: 'app-infradetails',
  templateUrl: './infradetails.component.html',
  styleUrls: ['./infradetails.component.css']
})
export class InfradetailsComponent implements OnInit {
  public serverType: any;
  public expired: any;
  public notExpired: any;
  public highIncidents: any;
  public loading: boolean;
  public mediumIncidents: any;
  public lowIncidents: any;
  public highTestResults: any;
  public medTestResults: any;
  public lowTestResults: any;
  public highComplianceCheck: any;
  public lowComplianceCheck: any;
  public infraStructures: any = [];
  public infraStructureDTO: InfraStructureDTO;
  constructor(private activatedRoute: ActivatedRoute, public sideNavService: AlertService,
    private httpClient: HttpClient) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.infraStructureDTO = new InfraStructureDTO();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.serverType = params['type'];

    });

    this.getPageData();
  }

  getPageData() {
    let url = APP_CONFIG.getInfraDetails + "/" + this.serverType;
    this.loading = true;
    this.httpClient.get(url)
      .subscribe((data: any) => {
        this.loading = false;
        this.infraStructureDTO=data;
      }, error => {
        this.loading = false;
        console.log(error);
      })
  }

}
