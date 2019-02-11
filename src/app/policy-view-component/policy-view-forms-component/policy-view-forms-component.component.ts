import { ApiserviceService } from '../../apiservice.service';
import { Component, OnInit } from '@angular/core';
import { PolicyGrp } from '../../data_modelPolicy';
import { FilterPipe } from '../../convertDate.pipe';
import { IMyDate } from 'mydatepicker';
import { UtilService } from '../../util.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';




@Component({
  selector: 'app-policy-view-forms-component',
  templateUrl: './policy-view-forms-component.component.html',
  styleUrls: ['./policy-view-forms-component.component.css'],
  providers: [ApiserviceService]
})
export class PolicyViewFormsComponentComponent implements OnInit {
  policyDisplay: PolicyGrp;
  public definitive: boolean;
  public policy: boolean;
  public policyData: any;
  public auditTypes: any;
  public policyTypes: any;
  public selectDate: IMyDate = null;
  public date: string;
  public policyGrpId: number;
  public policyDropDownId: number;
  public policyReload: boolean;
  public navigationSubscription: any;
  public auditTypeId:any;
  constructor(private _apiservice: ApiserviceService, private utilservice: UtilService,
    private router: Router, private route: ActivatedRoute) {
    this.policyDisplay = new PolicyGrp();
    if(UtilService.backClicked)
    {
      UtilService.backClicked=false;
      this.definitive=true;
      this.policy=true;
      this.selectDefinitive(UtilService.auditId);
      this.auditTypeId=UtilService.auditId;
      this.policyGrpId=UtilService.policyGrpId;
      if(UtilService.review)
      {
        UtilService.review=false;
      }
    }
  }

  ngOnInit() {

    this.showDropdown();
  }

  selectType(policy) {
    if (policy === 'Choose...' || policy === "") {
      this.policy = false;
    }
    else {
      this.policy = true;
      UtilService.policyGrpId = policy;
      //this.fetchPolicies(UtilService.policyGrpId);
      this.router.navigate(['dummy'], { relativeTo: this.route });

    }
  }

  showDropdown() {

    this._apiservice.getAuditTypes()
      .subscribe((data: any) => {
        this.auditTypes = data;
      }, error => { console.log(error); });


  }

  selectDefinitive(auditID) {
    if (auditID === 'Choose...' || auditID === "") {
      this.definitive = false;
      this.policyTypes = [];
    }
    else {
      this.definitive = true;
      UtilService.auditId = auditID;
      this._apiservice.getPolicyGroup(auditID)
        .subscribe((data: any) => {
          this.policyTypes = data;
        }, error => { console.log(error) });
    }



  }


  fetchPolicies(id) {
    this._apiservice.fetchPolicies(id)
      .subscribe((data: any) => {
        this.policyDisplay = data.policyGrpDTO;
        var date = this.policyDisplay.updatedTs;
        var dt = new Date(0);
        let d = new Date(this.policyDisplay.updatedTs);
        this.selectDate = {
          year: d.getFullYear(),
          month: d.getMonth() + 1,
          day: d.getDate()
        }
        this.date = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();
      }, error => console.log(error));

  }
}
