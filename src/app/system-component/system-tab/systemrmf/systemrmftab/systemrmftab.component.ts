import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-systemrmftab',
  templateUrl: './systemrmftab.component.html',
  styleUrls: ['./systemrmftab.component.css']
})
export class SystemrmftabComponent implements OnInit {
  public disabled: any;

  constructor() {
    this.disabled = JSON.parse(sessionStorage.getItem("rmfdisabled"));

   }

  ngOnInit() {
  }

}
