import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policyapplication',
  templateUrl: './policyapplication.component.html',
  styleUrls: ['./policyapplication.component.css']
})
export class PolicyapplicationComponent implements OnInit {

  constructor() { 
    sessionStorage.removeItem('policiesFamId');

  }

  ngOnInit() {
  }

}
