import { Component, OnInit, ViewChildren,QueryList} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../../app.config';
import { Router, ActivatedRoute } from '@angular/router';
import { policyService } from '../policy-service';
import { AlertService } from '../../alert.service';
import { NgbdSortableHeader, SortEvent } from '../../sort';

@Component({
  selector: 'app-admin-policy',
  templateUrl: './admin-policy.component.html',
  styleUrls: ['./admin-policy.component.css']
})
export class AdminPolicyComponent implements OnInit {

  public policy: boolean;
  public loading: boolean = false;
  public auditTypes: any;
  public definitive: boolean;
  public policyTypes: any;
  public auditTypeId: any;
  public policyGrpId: number;
  public policyType: any;
  public policies: any;
  public allPolicies: any;
  public p:number=1;
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

    this.getAllPolicies();

  }
  getNistData() {
    this.loading = true;
    let url = APP_CONFIG.getNISTPolicies;
    this.httpClient.get(url)
      .subscribe((data: any) => {
        this.loading = false;
        this.policies = data;
        console.log("policiees"+this.policies);
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

  getAllPolicies(){
    this.loading = true;
    let url = APP_CONFIG.getAllPolicies;
    this.httpClient.get(url)
    .subscribe((data: any) => {
      this.loading = false;
      this.allPolicies = data;
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
  
  
  
  toSorting(countries: any[], column: string, direction: string): any[] {
    if (direction === '') {
      return countries;
    } else {
      return [...countries].sort((a, b) => {
        const res = this.compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
  
  compare(v1: any, v2: any) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }



}
