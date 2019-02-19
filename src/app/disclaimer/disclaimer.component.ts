import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPageComponent } from 'app/login-page/login-page.component';
import { OktaAuthService } from '../okta/oka.service';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.css'],
  providers:[LoginPageComponent]
})
export class DisclaimerComponent implements OnInit {

  constructor(private router: Router,private login:LoginPageComponent,private okta:OktaAuthService) { }

  ngOnInit() {
  }

  async agree()
  {
    let result:any = await this.okta.isAuthenticated();
    this.login.getLogin();
    //this.router.navigate(['/login']);
  }

}
