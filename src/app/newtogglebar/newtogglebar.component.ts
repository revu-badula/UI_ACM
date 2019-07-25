import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-newtogglebar',
  templateUrl: './newtogglebar.component.html',
  styleUrls: ['./newtogglebar.component.css']
})
export class NewtogglebarComponent implements OnInit {

  constructor(public sideNavService : AlertService) { }

  ngOnInit() {
  }

}
