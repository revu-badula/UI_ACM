import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from 'app/app.config';

@Component({
  selector: 'app-upcoming-audit',
  templateUrl: './upcoming-audit.component.html',
  styleUrls: ['./upcoming-audit.component.css']
})
export class UpcomingAuditComponent implements OnInit {

  public loading:boolean=false;
  public vendors:any;
  constructor(private _location: Location,private httpClient:HttpClient) { }

  ngOnInit() {
    this.upcomingAudits();

  }

  upcomingAudits()
  {
    this.loading = true;
    let url=APP_CONFIG.upComingAudits
    this.httpClient.get(url)
      .subscribe((data: any) => {
        this.loading = false;
        this.vendors = data.vendorsDTOs;
        
      }, error => {
        this.loading = false;
        console.log(error);
      });
  }


  backClicked() {
    this._location.back();
  }

}
