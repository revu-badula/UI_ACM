import { Component, OnInit } from '@angular/core';
import { APP_CONFIG } from '../../app.config';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-policyfamilies',
  templateUrl: './policyfamilies.component.html',
  styleUrls: ['./policyfamilies.component.css']
})
export class PolicyfamiliesComponent implements OnInit {

    public loading: boolean = false;
    public famlilies : any;
    public policies : any;

  constructor( private httpClient: HttpClient) { }

  ngOnInit() {
      this.getPolicyFamilies();
  }
  
  getPolicyFamilies()
  {
      this.loading = true;
      let url =  APP_CONFIG.getPolicyFamilies+"/"+sessionStorage.getItem("policyGrpId");
      this.httpClient.get(url)
      .subscribe((data: any) => {
          this.famlilies = data;
          this.loading = false;;
      }, error => {
          this.loading = false;;
          console.log(error);
        });
  }
  
  selectFamily(familyId:any)
  {
      this.loading = true;
      let url =  APP_CONFIG.getPoliciesByFamId+"?policiesByFamId="+familyId;
      this.httpClient.get(url)
      .subscribe((data: any) => {
          this.policies = data;
          this.loading = false;;
      }, error => {
          this.loading = false;;
          console.log(error);
        });
  }
}
