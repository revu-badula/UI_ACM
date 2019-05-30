import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-deviceentry',
  templateUrl: './deviceentry.component.html',
  styleUrls: ['./deviceentry.component.css']
})
export class DeviceentryComponent implements OnInit {

  constructor(private router:Router,private _location: Location) { }

  ngOnInit() {
  }

  getValue(value:any)
  {

    this.router.navigate([value]);
  }
  backClicked() {
    this._location.back();
  }

}
