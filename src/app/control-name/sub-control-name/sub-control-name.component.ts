import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'app/apiservice.service';
import { Policy, PolicyDocumentsDTO, PolicyGrp, subControl } from '../../data_modelPolicy';
import { APP_CONFIG } from '../../app.config';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
@Component({
  selector: 'app-sub-control-name',
  templateUrl: './sub-control-name.component.html',
  styleUrls: ['./sub-control-name.component.css']
})
export class SubControlNameComponent implements OnInit {

  public loading: boolean = false;
  policyAccess: Policy;
  subControl1: subControl;
  constructor(private _apiservice: ApiserviceService,private http: Http) {
    this.subControl1 = new subControl();
     this.getPolicy();
  }

  ngOnInit() {
  }

  

  getPolicy(){
    let polId =localStorage.getItem('policyId');
    let poId = +polId;
    this._apiservice.getPolicy(poId)
      .subscribe((data: any) => {
        this.loading = false;
      	this.policyAccess = data;

      });
  }


  addSubPolicy() 
  {
    if(this.policyAccess.subPolicyDTOs === null)
    {
      this.policyAccess.subPolicyDTOs =[];
      this.policyAccess.subPolicyDTOs.push(this.subControl1)
    }
    else{
      this.policyAccess.subPolicyDTOs.push(this.subControl1);
    }
    let url = APP_CONFIG.updatePolicy;
    var formData = new FormData();
    formData.append('policy', JSON.stringify(this.policyAccess));
  
     this.http.post(url, formData).subscribe((data: any) => {
            }, error => console.log(error));
  }


  

}


