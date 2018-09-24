
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';

import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanLoad, Route
} from '@angular/router';
import { UtilService } from './util.service';



@Injectable()
export class SystemGuardAssess implements CanActivate {
    constructor(private router: Router, private utilService: UtilService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        //let path: string = route.routeConfig.path;
        if (Cookie.get('access_token')) {

            if (localStorage.getItem('systemAssessActive')) {
                return true;
            }
            else {
                return false;


            }
        }
        else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });

        }


    }


}
