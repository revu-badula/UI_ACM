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
    this.okta.logout();
    Cookie.delete('access_token');
    Cookie.delete('userName');
    UtilService.calback=true;
    localStorage.removeItem('localityName');
    localStorage.removeItem('appAuditId');
    localStorage.removeItem('appMouId');
    localStorage.removeItem('auditActive');
    localStorage.removeItem('active');
    localStorage.removeItem('assessActive');
    localStorage.removeItem('assesId');
    localStorage.removeItem('systemName');
    localStorage.removeItem('systemActive');
    localStorage.removeItem('systemAssessActive');
    localStorage.removeItem('systemAuditActive');
    localStorage.removeItem('systemAppAuditId');
    localStorage.removeItem('sysassesId');
    localStorage.removeItem('appSolId');
    localStorage.removeItem('systemMouId');
    localStorage.removeItem('fipscode');
    this.router.navigate(['/logout']);
  }

}
