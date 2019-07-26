import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { policyService } from '../policy-service';
import { AlertService } from '../../alert.service';

@Component({
  selector: 'app-policy-parent',
  templateUrl: './policy-parent.component.html',
  styleUrls: ['./policy-parent.component.css']
})
export class PolicyParentComponent implements OnInit {

  public showData: boolean = false;
  public families: any;
  private subscription: Subscription
  public showNav: boolean;
  constructor(public sideNavService: AlertService, private policyService: policyService) {
    sessionStorage.removeItem('auditId');
    //sessionStorage.removeItem('policyGrpId');
    
  }

  ngOnInit() {
   
    // this.subscription = this.policyService.policyState.subscribe((state: any) => {
    //   console.log("state"+ state);
    //     this.showNav = state.show;
    //   });
  }

  getFamilies() {

  }

  getData(value: any) {

  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }


}
