import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NgRedux } from '@angular-redux/store';
import { IUserState } from './user.state';
import { AuthHelpers } from './helpers';
import { AUTH_LOGIN_ROUTE } from './tokens';

interface AuthRoteData {
    roles: string[];
    redirect: string;
    everyRole: boolean;
}

@Injectable()
export class AuthorizeGuard<TState extends { user: IUserState }> implements CanActivate, CanLoad, CanActivateChild {

    constructor(
        private ngRedux: NgRedux<TState>,
        private router: Router,
        private authHelpers: AuthHelpers<TState>,
        @Inject(AUTH_LOGIN_ROUTE) private loginRoute
    ) { }

    private checkRoles(data: AuthRoteData, redirect = true) {
        const passed = this.authHelpers.isInRoles(data.roles, data.everyRole);
        if (!passed && redirect) {
            this.router.navigateByUrl(data.redirect);
        }
        return passed;
    }

    private getData(route: Route | ActivatedRouteSnapshot) {
        const data: AuthRoteData = {
            redirect: this.loginRoute,
            roles: [],
            everyRole: false
        };

        if (!route.data) {
            return data;
        }

        data.roles = route.data.roles || data.roles;
        data.redirect = route.data.redirect || data.redirect;
        data.everyRole = route.data.everyRole || data.everyRole;

        return data;
    }

    canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
        return this.checkRoles(this.getData(route));
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.canActivate(childRoute, state);
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.checkRoles(this.getData(next));
    }
}
