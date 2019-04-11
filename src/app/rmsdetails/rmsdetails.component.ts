import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from 'app/app.config';

@Component({
  selector: 'app-rmsdetails',
  templateUrl: './rmsdetails.component.html',
  styleUrls: ['./rmsdetails.component.css']
})
export class RmsdetailsComponent implements OnInit {

  public loading: boolean = false;
  public outcomes:any;
  public rmfProcessID:any;
  public second:boolean;
  public purpose:any;
  constructor(private router: Router, private httpClient: HttpClient,private route: ActivatedRoute) { 
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.route.params.subscribe(params => {
      this.rmfProcessID = params['id'];
      if(this.second)
      this.getData();
    });
  }

  ngOnInit() {
    this.second=true;
    this.getData();
  }

  getData() {
    this.loading = true;
    let url = APP_CONFIG.getRMFDetails;
    this.httpClient.get(url+"?"+"rmfProcessId="+this.rmfProcessID)
      .subscribe((data: any) => {
        this.loading = false;
        this.purpose=data.purpose;
        this.outcomes=data.rmfDetailDTOs;
      }, error => {
        this.loading = false;
        console.log(error);
      })
  }
  goTo(id:any)
  {
    this.router.navigate(['rms/taskdetails/'+id]);
  }
}
