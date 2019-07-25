import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../app.config';
import { AlertService } from 'app/alert.service';
@Component({
  selector: 'app-infradetails',
  templateUrl: './infradetails.component.html',
  styleUrls: ['./infradetails.component.css']
})
export class InfradetailsComponent implements OnInit {
    public serverType:any;
    public expired:any;
    public notExpired:any;
    public highIncidents:any;
    public mediumIncidents:any;
    public lowIncidents:any;
    public highTestResults:any;
    public medTestResults:any;
    public lowTestResults:any;
    public highComplianceCheck:any;
    public lowComplianceCheck:any;
    public infraStructures:any = [];
    constructor(private activatedRoute: ActivatedRoute,public sideNavService : AlertService,private httpClient: HttpClient) { }

  ngOnInit() {
      this.activatedRoute.params.subscribe(params => {
          this.serverType = params['type'];

        });
      
      this.getPageData();
  }
  
  getPageData()
  {
      let url = APP_CONFIG.getInfraDetails+"/"+this.serverType;
      this.httpClient.get(url)
        .subscribe((data: any) => {
            this.expired = data.renewalExpiredCount;
            this.notExpired = data.renewalCount;
            
            this.highIncidents = data.highIncidentsCount;
            this.mediumIncidents = data.medIncidentsCount;
            this.lowIncidents = data.lowIncidentsCount;
            
            this.highTestResults = data.highTestResultsCount;
            this.medTestResults = data.medTestResultsCount;
            this.lowTestResults = data.lowTestResultsCount;
            
            this.highComplianceCheck = data.highComplianceCheck;
            this.lowComplianceCheck = data.highComplianceCheck;
            this.infraStructures = data.servers;
            
         
        }, error => {
          console.log(error);
        })
  }

}
