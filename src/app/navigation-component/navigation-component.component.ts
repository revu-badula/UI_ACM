import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HostListener } from '@angular/core';
import { OktaAuthService } from '../okta/oka.service';
import { UtilService } from '../util.service';
@Component({
  selector: 'app-navigation-component',
  templateUrl: './navigation-component.component.html',
  styleUrls: ['./navigation-component.component.css']
})
export class NavigationComponentComponent implements OnInit {

  public userName:any;
  constructor(private router: Router, private okta:OktaAuthService, private utilService: UtilService) {
    this.userName=Cookie.get("userName");
   }

  ngOnInit() {
  }




   signOut()
  {
    //localStorage.clear();
    Cookie.delete('access_token');
    Cookie.delete('userName');
    UtilService.calback=true;
    sessionStorage.removeItem('localityName');
    sessionStorage.removeItem('appAuditId');
    sessionStorage.removeItem('appMouId');
    sessionStorage.removeItem('auditActive');
    sessionStorage.removeItem('active');
    sessionStorage.removeItem('assessActive');
    sessionStorage.removeItem('assesId');
    sessionStorage.removeItem('systemName');
    sessionStorage.removeItem('systemActive');
    sessionStorage.removeItem('systemAssessActive');
    sessionStorage.removeItem('systemAuditActive');
    sessionStorage.removeItem('systemAppAuditId');
    sessionStorage.removeItem('sysassesId');
    sessionStorage.removeItem('appSolId');
    sessionStorage.removeItem('systemMouId');
    sessionStorage.removeItem('fipscode');
    this.okta.logout();
    this.router.navigate(['/logout']);
  }
  goTo()
  {
    this.router.navigate(['/dashboard']);
  }

}
