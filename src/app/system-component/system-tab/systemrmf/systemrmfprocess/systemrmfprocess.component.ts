import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-systemrmfprocess',
  templateUrl: './systemrmfprocess.component.html',
  styleUrls: ['./systemrmfprocess.component.css']
})
export class SystemrmfprocessComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  goTo(value:any)
  {
    this.router.navigate([value]);
  }

}
