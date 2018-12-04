import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UtilService } from './util.service';
import { Cookie } from 'ng2-cookies';
import { OktaAuthService } from './okta/oka.service';
import { from } from 'rxjs';
@Injectable()
export class AuthGuard implements CanActivate {
    authenticated:boolean=false;
    constructor(private router: Router, private utilservice: UtilService, private okta: OktaAuthService) {
       
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //if (localStorage.getItem('currentUser')) {
        //console.log(this.authenticated)
        // const obsrv = from(this.authenticated);
        // obsrv.subscribe((data:any) => {
        //     console.log(data);
        // },error => {console.log(error)});
        if (Cookie.get('access_token')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }

     
}