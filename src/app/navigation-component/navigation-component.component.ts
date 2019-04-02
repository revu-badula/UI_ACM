import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { Router,NavigationEnd, ActivatedRoute } from '@angular/router';
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
  public currentURL1:boolean=true;
  constructor(private router: Router, private okta:OktaAuthService, 
    private utilService: UtilService, route: ActivatedRoute) {
    this.userName=Cookie.get("userName");
    router.events
    .filter(e => e instanceof NavigationEnd)
    .forEach(e => {
        let currentURL = route.root.firstChild.snapshot.data['title'];
        if(currentURL === 'graph')
        {
          this.currentURL1=false;
        }
    });
   }

  ngOnInit() {
  }




   async signOut()
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
    let result:any= await this.okta.isAuthenticated();
    if(result){
    this.okta.logout();
    this.router.navigate(['/logout']);
    }
    else{
      //this.okta.logout();
      this.router.navigate(['/logout']);
    }
  }
  goTo()
  {
    this.router.navigate(['/graph']);
  }

}
