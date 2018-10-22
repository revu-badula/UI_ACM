import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-device',
  templateUrl: './report-device.component.html',
  styleUrls: ['./report-device.component.css']
})
export class ReportDeviceComponent implements OnInit {
  color: String;
  public desc:boolean=false;
  public p:number=1;
  constructor() { }

  ngOnInit() {
  }
  getColor() {
    return this.color === 'online' ? '#ffffff' : 'white';
  }
  getOpacity() {
    return this.color === 'online' ? 0.8 : 1;
  }
}
