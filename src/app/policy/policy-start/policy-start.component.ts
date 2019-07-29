import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../../app.config';
import { Router, ActivatedRoute } from '@angular/router';
import { policyService } from '../policy-service';
import { AlertService } from '../../alert.service';

@Component({
  selector: 'app-policy-start',
  templateUrl: './policy-start.component.html',
  styleUrls: ['./policy-start.component.css']
})
export class PolicyStartComponent implements OnInit {

  public policy: boolean;
  public loading: boolean = false;
  public auditTypes: any;
  public definitive: boolean;
  public policyTypes: any;
  public auditTypeId: any;
  public policyGrpId: number;
  public policyType: any;
  public policies: any;
  constructor(public sideNavService: AlertService,
    private activatedRoute: ActivatedRoute, private router: Router,
    private httpClient: HttpClient, private policyService: policyService) {
    this.policyService.hide();
    sessionStorage.removeItem('policiesFamId');
    this.activatedRoute.params.subscribe(params => {
      this.policyType = params['id'];

    });
  }

  ngOnInit() {
    if (this.policyType === "Others")
      this.showDropdown();
    else {
      this.getNistData();
    }

  }
  getNistData() {
    this.loading = true;
    let url = APP_CONFIG.getNISTPolicies;
    this.httpClient.get(url)
      .subscribe((data: any) => {
        this.loading = false;
        this.policies = data;
      }, error => {
        this.loading = false;
        console.log(error);
      });
  }
  selectType(policy: any) {
    if (policy === 'Choose...' || policy === "") {
    }
    else {
      sessionStorage.setItem("policyGrpId", policy);
      this.router.navigate(['/firstpolicy/details']);
    }
  }

  showDropdown() {
    this.loading = true;
    let url = APP_CONFIG.getAuditTypes;
    this.httpClient.get(url)
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
      let url = APP_CONFIG.getPolicyGroup;
      this.httpClient.get(url + '?' + 'auditTypeId' + '=' + auditID)
        .subscribe((data: any) => {
          this.loading = false;
          this.policies = data;
        }, error => {
          this.loading = false;
          console.log(error)
        });
    }
  }

  loadPolicies(id: any) {
    sessionStorage.setItem("policyGrpId", id);
    this.router.navigate(['/firstpolicy/details']);
  }


}
