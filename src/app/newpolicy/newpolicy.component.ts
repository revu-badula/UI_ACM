import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newpolicy',
  templateUrl: './newpolicy.component.html',
  styleUrls: ['./newpolicy.component.css'],
  providers: [ApiserviceService]

})
export class NewpolicyComponent implements OnInit {

  public showData: boolean = false;
  public families: any;
  public i: any = 0;
  constructor(private _apiservice: ApiserviceService, private router: Router) {
    sessionStorage.removeItem('auditId');
    sessionStorage.removeItem('policyGrpId');
  }

  ngOnInit() {
  }
  setRoutedComponent(value: any) {
    if (value.router.url === '/spolicy/policySrt') {
      if (this.showData) {
      }
      else {
        this.showData = false;
      }
    }
    else if (value.router.url === '/spolicy/sdetails') {
      // if (this.showData) {

      // }
      // else {
        this.showData = true;
        this.getFamilies();
      //}
    }

  }

  getFamilies() {

    let id = +sessionStorage.getItem("policyGrpId");
    this.families = [];
    this._apiservice.fetchPolicyFamily(id)
      .subscribe((data: any) => {
        this.families = data;

      }, error => {
        console.log(error)
      });
  }

  getData(value: any) {
    this.router.navigate(['spolicy/dummy/' + value]);
  }




}
