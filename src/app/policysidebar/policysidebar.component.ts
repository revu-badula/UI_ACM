import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policysidebar',
  templateUrl: './policysidebar.component.html',
  styleUrls: ['./policysidebar.component.css']
})
export class PolicysidebarComponent implements OnInit {

  constructor() { 
    sessionStorage.removeItem('auditId');
    sessionStorage.removeItem('policyGrpId');
  }

  ngOnInit() {
  }

}
