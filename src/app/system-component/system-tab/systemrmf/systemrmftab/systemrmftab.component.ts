import { Component, OnInit } from '@angular/core';
import { APP_CONFIG } from '../../../../app.config';

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

  getFile() {
    let url = APP_CONFIG.generatePOAM;
    let id = sessionStorage.getItem('systemRmfId');
    let rmfid = +id;
    if(rmfid != 0)
    window.open(url + '?' + 'rmfAppId' + '=' + rmfid);
  }

}
