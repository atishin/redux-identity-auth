import { Action, AnyAction } from 'redux';
import { IUserState } from './user.state';
import { Injectable, Optional, Inject } from '@angular/core';
import { GrantProvider } from './grant-providers/grant';
import { IUserLoginAction, IUserAuthFailureAction, IUserAuthenticatedAction, UserActionsService } from './actions/user-actions';
import { HANDLE_AUTH_ERROR, ErrorHandler, HANDLE_ERROR } from './tokens';
import { INITIAL_USER_STATE } from './initial.states';
import { Router } from '@angular/router';
import { AUTHENTICATED_ROUTE } from './index';

@Injectable()
export class UserReducerService {

    constructor(
        private grantProvider: GrantProvider,
        @Optional() @Inject(HANDLE_AUTH_ERROR) private errorHandler: ErrorHandler,
        @Optional() @Inject(AUTHENTICATED_ROUTE) private authenticatedRoute: string,
        private router: Router
    ) { }

    private login(state: IUserState, action: IUserLoginAction): IUserState {
        this.grantProvider.signIn(action.model);
        return {
            ...state,
            isAuthenticating: true
        };
    }

    private logout(state, action: Action) {
        return {
            ...state,
            isAuthenticated: false,
            info: null
        };
    }

    private authFailure(state: IUserState, action: IUserAuthFailureAction): IUserState {
        if (this.errorHandler) {
            this.errorHandler(action.error);
        }
        return {
            ...state,
            isAuthenticating: false
        };
    }

    private authenticated(state: IUserState, action: IUserAuthenticatedAction): IUserState {
        if (this.authenticatedRoute) {
            if (typeof this.authenticatedRoute === 'string') {
                this.router.navigateByUrl(this.authenticatedRoute);
            } else {
                this.router.navigate(this.authenticatedRoute);
            }
        }
        return {
            ...state,
            info: action.info,
            isAuthenticating: false,
            isAuthenticated: true
        };
    }

    reducer() {
        return function (state: IUserState, action: AnyAction) {
            switch (action.type) {
                case UserActionsService.LOGIN: return this.login(state, action as IUserLoginAction);
                case UserActionsService.LOGOUT: return this.logout(state, action);
                case UserActionsService.AUTH_FAILURE: return this.authFailure(state, action as IUserAuthFailureAction);
                case UserActionsService.AUTHENTICATED: return this.authenticated(state, action as IUserAuthenticatedAction);
            }
            return state != null ? state : INITIAL_USER_STATE;
        }.bind(this);
    }
}
