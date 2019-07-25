import { Component, OnInit } from '@angular/core';
import { AlertService } from 'app/alert.service';

@Component({
  selector: 'app-incidentdetails',
  templateUrl: './incidentdetails.component.html',
  styleUrls: ['./incidentdetails.component.css']
})
export class IncidentdetailsComponent implements OnInit {

  constructor(public sideNavService: AlertService) { }

  ngOnInit() {
  }

}
