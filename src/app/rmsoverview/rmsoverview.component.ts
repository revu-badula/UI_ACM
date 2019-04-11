import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rmsoverview',
  templateUrl: './rmsoverview.component.html',
  styleUrls: ['./rmsoverview.component.css']
})
export class RmsoverviewComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  goTo()
  {
    this.router.navigate(['rms/rmsdetails/1']);
  }

}
