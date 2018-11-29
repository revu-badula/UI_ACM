import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '../okta/oka.service';
import { Router } from '@angular/router';
@Component({template: ``})
export class CallbackComponent implements OnInit {

  constructor(private okta: OktaAuthService, private router: Router) {
    this.okta.handleAuthentication();
    //this.handleAuthentication = this.handleAuthentication.bind(this);
    //this.isAuthenticated = this.isAuthenticated.bind(this);
    //this.getUser = this.getUser.bind(this);
    //this.getIdToken = 
    //console.log(this.okta.getIdToken.bind(this));
    // this.getAccessToken = this.getAccessToken.bind(this);
    // this.login = this.login.bind(this);
    // this.logout = this.logout.bind(this);
    // this.redirect = this.redirect.bind(this);
  }

  ngOnInit() {
  }


}
