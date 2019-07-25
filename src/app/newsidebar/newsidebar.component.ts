import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-newsidebar',
  templateUrl: './newsidebar.component.html',
  styleUrls: ['./newsidebar.component.css']
})
export class NewsidebarComponent implements OnInit {

  constructor(public sideNavService : AlertService) { }

  ngOnInit() {
  }

}
