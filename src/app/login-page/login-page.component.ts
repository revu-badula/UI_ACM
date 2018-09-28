import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../alert.service';
import { AuthenticationService } from '../authentication.service';
import { UtilService } from '../util.service';
import { Http, RequestOptionsArgs, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Cookie } from 'ng2-cookies';

//import { AlertService, AuthenticationService } from '../_services';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],

})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  @ViewChild('pass') inputEl: ElementRef;
  public show: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, private alertService: AlertService,
    private authservice: AuthenticationService,
    private utilservice: UtilService, private http: Http, private httpClient: HttpClient) {
    UtilService.loginstate = false;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    //this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    // this.authservice.login(this.f.username.value, this.f.password.value)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       //this.router.navigate([this.returnUrl]);
    //       this.router.navigate(['/dashboard']);
    //     },
    //     error => {
    //       //this.alertService.error(error);
    //       this.loading = false;
    //       let err = "username and password are incorrect";
    //       this.alertService.error(err);
    //       this.router.navigate(['/login']);
    //     });

    // if (this.f.username.value === 'vineeth' && this.f.password.value === 'vineeth') {
    //   this.loading = false;
    //   localStorage.setItem('dash','true');
    //   this.router.navigate(['/dashboard']);
    // }
    // else {
    //   this.loading = false;
    //   let err = "username and password are incorrect";
    //   this.alertService.error(err);
    //   //this.router.navigate(['/login']);
    // }
    let params = new URLSearchParams();
    params.append('username', this.f.username.value);
    params.append('password', this.f.password.value);
    params.append('grant_type', 'password');
    params.append('client_id', 'Doel');
    let data = "username=" + this.f.username.value + "&password=" + this.f.password.value + "&grant_type=password" + "&client_id=Doel";
    let reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic RG9lbDpzZWNyZXQ=' });
    //return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
    const headers = new Headers();
    //headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    //headers.append('Authorization','Basic RG9lbDpzZWNyZXQ=');
    //let options = new RequestOptions({ headers: headers });
    this.httpClient.post(`http://172.24.16.56:8080/IAMApplication/oauth/token`, data, { headers: reqHeader })
      .subscribe(data => {
        this.loading = false;
        this.saveToken(data);
      }, error => {
        this.loading = false;
        let err = "username and password are incorrect";
        this.alertService.error(err);
        console.log(error)
      });



  }

  showPassword() {
    //let inputEl: HTMLInputElement = this.inputEl.nativeElement;
    this.show = !this.show;
    if (this.show) {
      this.inputEl.nativeElement.type = 'text';
    }
    else {
      this.inputEl.nativeElement.type = 'password';
    }
  }

  saveToken(token) {

    //var expireDate = new Date().getTime() + (token.expires_in);
    //console.log(expireDate)
    let minutes = token.expires_in / 60;
    var now = new Date();
    now.setTime(now.getTime() + (minutes * 60 * 1000))
    Cookie.set("access_token", token.access_token, now);
    this.getPrincipalObject();
    //this.router.navigate(['/dashboard']);

  }

  getPrincipalObject() {

    this.loading = true;
    let auth = 'Bearer ' + Cookie.get('access_token');
    let reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': auth });
    this.httpClient.get(`http://172.24.16.56:8080/IAMApplication/services/userInfo`, { headers: reqHeader })
      .subscribe((res: any) => {
        this.loading = false;
        let fn = res.firstName;
        let ln = res.lastName;
        let userName = fn + " " + ln;
        Cookie.set('userName', userName);
        this.router.navigate(['/dashboard']);
      }, error => {
        this.loading = false;
        console.log(error);
      })
  }
}