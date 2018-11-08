import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ApiserviceService } from 'app/apiservice.service';
import { Policy, PolicyDocumentsDTO, PolicyGrp, subControl } from '../../data_modelPolicy';
import { APP_CONFIG } from '../../app.config';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-sub-control-name',
  templateUrl: './sub-control-name.component.html',
  styleUrls: ['./sub-control-name.component.css']
})
export class SubControlNameComponent implements OnInit {

  public loading: boolean = false;
  policyAccess: Policy;
  subControl1: subControl;
  public showForm: boolean = false;
  @ViewChild('content') content: TemplateRef<any>;
  constructor(private _apiservice: ApiserviceService, private http: Http,
    public datepipe: DatePipe,private modalService: NgbModal) {
    this.subControl1 = new subControl();
    this.getPolicy();

  }

  ngOnInit() {
  }



  getPolicy() {
    let polId = localStorage.getItem('policyId');
    let poId = +polId;
    this._apiservice.getPolicy(poId)
      .subscribe((data: any) => {
        this.loading = false;
        this.policyAccess = data;
        this.showInfo(data.subPolicyDTOs);

      });
  }
  showInfo(value)
  {
    if(localStorage.getItem('subPol') === null)
    {

    }
    else{
      let id = localStorage.getItem('subPol');
      let poId =+id;
      value.filter(item => {
        if(item.subPolicyId === poId)
        {
          this.subControl1=item;
        }
      })
    }
  }


  addSubPolicy() {
    this.loading=true;
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    if (this.policyAccess.subPolicyDTOs === null) {
      this.policyAccess.subPolicyDTOs = [];
      this.policyAccess.subPolicyDTOs.push(this.subControl1)
    }
    else {
      this.policyAccess.subPolicyDTOs.push(this.subControl1);
    }
    let url = APP_CONFIG.updatePolicy;
    var formData = new FormData();
    formData.append('policy', JSON.stringify(this.policyAccess));

    this.http.post(url, formData).subscribe((data: any) => {
      this.loading=false;
      this.modalService.open(this.content, ngbModalOptions);
    }, error =>{ 
      this.loading=false;
      console.log(error);
    });
  }


  goTo(event)
  {
    
  }

  getEndDate(value)
  {
    if (value.formatted === "") {
    }
    else {
      let latest_date = this.datepipe.transform(value.formatted, 'yyyy-MM-dd');
      this.subControl1.endDate = moment(latest_date).format();
    }
  }



}


