import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policyapplication',
  templateUrl: './policyapplication.component.html',
  styleUrls: ['./policyapplication.component.css']
})
export class PolicyapplicationComponent implements OnInit {

  public loading: boolean = false;
  pendingApplications: any;
  public showPagination: boolean = true;
  public p: number = 1;
  constructor() {
    sessionStorage.removeItem('policiesFamId');

  }

  ngOnInit() {
  }

}
