import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { ApiserviceService } from '../apiservice.service';
import { UtilService } from '../util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-policy-view-component',
  templateUrl: './policy-view-component.component.html',
  styleUrls: ['./policy-view-component.component.css'],
  providers: [ApiserviceService]

})
export class PolicyViewComponentComponent implements OnInit {
  // @Output() featureSelected = new EventEmitter<string>();
  //  color: String;

  // onSelect(feature: string) {
  //   this.featureSelected.emit(feature);
  // }
  public policy: boolean;
  public loading: boolean = false;
  public auditTypes: any;
  public definitive: boolean;
  public policyTypes: any;
  public auditTypeId:any;
  public policyGrpId: number;

  constructor(private _location: Location
    , private _apiservice: ApiserviceService,
     private utilservice: UtilService, private router:Router) { 
      this.auditTypeId=+sessionStorage.getItem("auditId");
      //this.policyGrpId=UtilService.policyGrpId;
      this.policyGrpId=+sessionStorage.getItem("policyGrpId");
      if(this.auditTypeId != 0)
      this.selectDefinitive(this.auditTypeId);
     }

  ngOnInit() {
    this.showDropdown();

  }

  



  getColor() {
    // return this.color === 'online' ? '#ffffff' : 'white';
  }

  getOpacity() {
    // return this.color === 'online' ? 0.8 : 1;
  }

  selectType(policy: any) {
    if (policy === 'Choose...' || policy === "") {
      this.policy = false;
    }
    else {
      this.policy = true;
      UtilService.policyGrpId = policy;
      sessionStorage.setItem("policyGrpId", policy);
      this.router.navigate(['/spolicy/sdetails']);
    }
  }

  showDropdown() {
    this.loading = true;
    this._apiservice.getAuditTypes()
      .subscribe((data: any) => {
        this.loading = false;
        this.auditTypes = data;
      }, error => {
        this.loading = false;
        console.log(error);
      });


  }

  selectDefinitive(auditID: any) {
    if (auditID === 'Choose...' || auditID === "") {
      this.definitive = false;
      this.policyTypes = [];
    }
    else {
      this.loading = true;
      this.definitive = true;
      UtilService.auditId = auditID;
      sessionStorage.setItem("auditId", auditID);
      this._apiservice.getPolicyGroup(auditID)
        .subscribe((data: any) => {
          this.loading = false;
          this.policyTypes = data;
        }, error => {
          this.loading = false;
          console.log(error)
        });
    }



  }


}
