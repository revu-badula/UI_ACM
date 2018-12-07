import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as OktaAuth from '@okta/okta-auth-js';
import { Cookie } from 'ng2-cookies';
import { Http, RequestOptionsArgs, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//declare var require: any
//var OktaAuth = require("@okta/okta-auth-js");
@Injectable()
export class OktaAuthService {

  oktaAuth = new OktaAuth({
    issuer: 'https://dev-453625.oktapreview.com/oauth2/default',
    redirectUri: 'http://localhost:8080/Integra/callback',
    clientId: '0oai1582ptdSfti3f0h7',
    // issuer: 'https://dev-453625.oktapreview.com/oauth2/default',
    // redirectUri: 'http://172.24.16.56:8080/Integra/callback',
    // clientId: '0oahpllrzzFIIJmIU0h7',
    //  issuer: 'https://dev-453625.oktapreview.com/oauth2/default',
    //  redirectUri: 'http://23.96.86.203:8080/UIApp/callback',
    //  clientId: '0oai1buswsL7zAE7w0h7',
  });

  public accesTok: any;
  constructor(private router: Router, private httpClient: HttpClient, private route: ActivatedRoute) { }

  async isAuthenticated() {
    // Checks if there is a current accessToken in the TokenManger.
    //console.log(this.oktaAuth.tokenManager.get('accessToken'));
    // let data = await this.oktaAuth.tokenManager.get("accessToken");
    // return data;
    return !!(await this.oktaAuth.tokenManager.get('accessToken'));
  }

  login() {
    // Launches the login redirect.
    this.oktaAuth.token.getWithRedirect({
      responseType: ['id_token', 'token'],
      scopes: ['openid', 'email', 'profile']
    });
  }

  async handleAuthentication() {
    //this.isAuthenticated();
    const tokens = await this.oktaAuth.token.parseFromUrl();

    tokens.forEach(token => {
      if (token.idToken) {
        this.oktaAuth.tokenManager.add('idToken', token);
        // console.log(token.idToken);
        // console.log(token.claims.name);
        // console.log(token.claims.email);

      }
      if (token.accessToken) {
        this.oktaAuth.tokenManager.add('accessToken', token);
        //console.log(token.accessToken);
        this.accesTok = token.accessToken;
        //console.log(token);
        //this.getInfo();
        this.getUsrInfo(token);
        //console.log(this.accesTok);
      }

    });
    //     this.oktaAuth.token.getUserInfo()
    // .then(function(user) {
    //   // user has details about the user
    // });

  }

  async logout() {
    //console.log(this.oktaAuth.tokenManager.get("accessToken"));
    // this.oktaAuth.tokenManager.get('idToken')
    //   .then(function (token) {
    //     if (token) {
    //       // Token is valid
    //       //console.log(token);
    //     } else {
    //       // Token has expired
    //     }
    //   })
    //   .catch(function (err) {
    //     // OAuth Error
    //     console.error(err);
    //   });


    this.oktaAuth.tokenManager.clear();
    //console.log(this.oktaAuth.tokenManager);
    //await this.oktaAuth.logout();

    await this.oktaAuth.signOut();
    // .then(function () {
    //   console.log('successfully logged out');
    Cookie.delete("userName");
    Cookie.delete("access_token");

    // })
    // .fail(function (err) {
    //   console.error(err);
    // });
    //this.router.navigate(['/']);
  }

  async getInfo() {
    let token = await this.oktaAuth.tokenManager.get('accessToken');
    console.log(token);
    // .then(function (token) {
    //   if (token) {
    //     // Token is valid
    //     //console.log(token);
    //     //console.log(token);
    //   } else {
    //     // Token has expired
    //   }
    // })
    // .catch(function (err) {
    //   // OAuth Error
    //   console.error(err);
    // });
    //console.log(data);
    // await this.oktaAuth.token.getUserInfo(data)
    //   .then(function (user) {
    //     // user has details about the user
    //     console.log(user);
    //   });
  }

  async getUsrInfo(token) {
    //console.log(token);
    //console.log(token.expiresAt)
    let minutes = token.expiresAt/60;
    var now = new Date();
    now.setTime(now.getTime() + (minutes * 60 * 1000));
    //console.log(now);
    Cookie.set("access_token", token.accessToken, now);
    //console.log(Cookie.get("accessToken"));
    let user = await this.oktaAuth.token.getUserInfo(token);
    // .then(function (user) {

    Cookie.set("userName", user.name);
    //console.log(user.email);
    //   //console.log(Cookie.get('userName'));
    // let reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic RG9lbDpzZWNyZXQ=' });
    // let url="http://172.24.16.56:8080/UAMWebservices/fetchRoleNamesSVC?userId="+user.email;
    // this.httpClient.get(url,{ headers: reqHeader })
    // .subscribe(data => {
    //   //this.loading = false;
    //   //this.saveToken(data);
    //   console.log(data);
    //   this.router.navigate(['/dashboard']);
    // }, error => {
    //   // this.loading = false;
    //   // let err = "username and password are incorrect";
    //   // this.alertService.error(err);
    //   console.log(error)
    // });

    // });
    //console.log(user);
    // let url = this.route.snapshot.queryParams['returnUrl'] || '/';
    // console.log(url);
    this.router.navigate(['/dashboard']);
  }
}