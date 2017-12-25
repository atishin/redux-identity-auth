import { NgRedux } from '@angular-redux/store';
import { IUserState } from './user.state';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthHelpers<TState extends { user: IUserState }> {
    constructor(private ngRedux: NgRedux<TState>) { }

    isInRole(role: string) {
        const state = this.ngRedux.getState();
        if (!state.user.isAuthenticated || !state.user.info && state.user.info.roles) {
            return false;
        }
        return state.user.info.roles.includes(role);
    }

    isInRoles(roles: string[] = [], everyRole = false) {
        let passed = roles.length === 0;
        if (everyRole) {
            passed = roles.every(role => this.isInRole(role)) || roles.length === 0;
        } else {
            passed = roles.some(role => this.isInRole(role)) || roles.length === 0;
        }
        return passed;
    }

}
