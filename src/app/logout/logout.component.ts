import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  public loading:boolean=false;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToLogin()
  {
    this.router.navigate(['/login']);
  }

}
