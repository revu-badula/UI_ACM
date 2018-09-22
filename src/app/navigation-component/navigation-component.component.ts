import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-navigation-component',
  templateUrl: './navigation-component.component.html',
  styleUrls: ['./navigation-component.component.css']
})
export class NavigationComponentComponent implements OnInit {

  public userName:any;
  constructor(private router: Router) {
    this.userName=Cookie.get("userName");
   }

  ngOnInit() {
  }




  signOut()
  {
    //localStorage.clear();
    Cookie.delete('access_token');
    Cookie.delete('userName');
    localStorage.removeItem('localityName');
    localStorage.removeItem('appAuditId');
    localStorage.removeItem('appMouId');
    localStorage.removeItem('auditActive');
    localStorage.removeItem('active');
    localStorage.removeItem('assessActive');
    localStorage.removeItem('assesId');
    this.router.navigate(['/logout']);
  }

}
