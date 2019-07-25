import { Component, OnInit } from '@angular/core';
import { AlertService } from 'app/alert.service';

@Component({
  selector: 'app-newitpm',
  templateUrl: './newitpm.component.html',
  styleUrls: ['./newitpm.component.css']
})
export class NewitpmComponent implements OnInit {

  constructor(public sideNavService : AlertService) { }

  ngOnInit() {
  }

}
