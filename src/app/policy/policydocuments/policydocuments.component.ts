import { Component, OnInit } from '@angular/core';
import { AlertService } from 'app/alert.service';

@Component({
  selector: 'app-policydocuments',
  templateUrl: './policydocuments.component.html',
  styleUrls: ['./policydocuments.component.css']
})
export class PolicydocumentsComponent implements OnInit {

  constructor(public sideNavService: AlertService) { }

  ngOnInit() {
  }

}
