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
export class CallGuard implements CanActivate {
    constructor(private router: Router, private utilService: UtilService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        //let path: string = route.routeConfig.path;
        if (!UtilService.calback) {
          
            return true;
        }
        else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        }

    }

}