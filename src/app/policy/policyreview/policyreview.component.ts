import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../alert.service';

@Component({
  selector: 'app-policyreview',
  templateUrl: './policyreview.component.html',
  styleUrls: ['./policyreview.component.css']
})
export class PolicyreviewComponent implements OnInit {

  constructor(public sideNavService: AlertService) { 

  }
  ngOnInit() {
  }

}
