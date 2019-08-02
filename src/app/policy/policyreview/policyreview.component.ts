import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../alert.service';

@Component({
  selector: 'app-policyreview',
  templateUrl: './policyreview.component.html',
  styleUrls: ['./policyreview.component.css']
})
export class PolicyreviewComponent implements OnInit {


  public p: number = 1;
  public plus: boolean = true;
  public policyData: any;
  constructor(public sideNavService: AlertService) {
    sessionStorage.removeItem('policiesFamId');

  }
  ngOnInit() {
  }

}
