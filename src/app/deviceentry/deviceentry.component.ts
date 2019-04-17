import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deviceentry',
  templateUrl: './deviceentry.component.html',
  styleUrls: ['./deviceentry.component.css']
})
export class DeviceentryComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  getValue(value:any)
  {

    this.router.navigate([value]);
  }

}
