import { Action } from 'redux';
import {
    UserAction,
    UserActionsService,
    IUserLoginAction,
    IUserAuthenticatedAction,
    IUserWithRolesAuthenticatedAction
} from './user.actions';
import { IUserState, IUserWithRolesState } from './user.state';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { AuthServiceWithRoles } from './auth.service-with-roles';

@Injectable()
export class UserReducerService {

    constructor(private authService: AuthService) { }

    private login(state: IUserState, action: IUserLoginAction): IUserState {
        this.authService.login({ password: action.password, userName: action.userName });
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

    private authFailure(state: IUserState, action: Action): IUserState {
        return {
            ...state,
            isAuthenticating: false
        };
    }

    private authenticated(state: IUserState, action: IUserAuthenticatedAction): IUserState {
        return {
            ...state,
            info: action.info,
            isAuthenticating: false,
            isAuthenticated: true
        };
    }

    reducer() {
        return function (state: IUserState, action: UserAction) {
            switch (action.type) {
                case UserActionsService.LOGIN: return this.login(state, action as IUserLoginAction);
                case UserActionsService.LOGOUT: return this.logout(state, action);
                case UserActionsService.AUTH_FAILURE: return this.authFailure(state, action);
                case UserActionsService.AUTHENTICATED: return this.authenticated(state, action as IUserAuthenticatedAction);
            }
            return state != null ? state : { info: null, isAuthenticated: false, isAuthenticating: false }
        }.bind(this);
    }
}

@Injectable()
export class UserWithRolesReducerService {

    constructor(private authService: AuthServiceWithRoles) { }

    private login(state: IUserWithRolesState, action: IUserLoginAction): IUserWithRolesState {
        this.authService.login({ password: action.password, userName: action.userName });
        return {
            ...state,
            isAuthenticating: true
        };
    }

    private logout(state: IUserWithRolesState, action: Action): IUserWithRolesState {
        return {
            ...state,
            isAuthenticated: false,
            info: null,
        };
    }

    private authFailure(state: IUserWithRolesState, action: Action): IUserWithRolesState {
        return {
            ...state,
            isAuthenticating: false
        };
    }

    private authenticated(state: IUserWithRolesState, action: IUserWithRolesAuthenticatedAction): IUserWithRolesState {
        return {
            ...state,
            info: action.info,
            isAuthenticating: false,
            isAuthenticated: true
        };
    }

    reducer() {
        return function (state: IUserWithRolesState, action: UserAction): IUserWithRolesState {
            switch (action.type) {
                case UserActionsService.LOGIN: return this.login(state, action as IUserLoginAction);
                case UserActionsService.LOGOUT: return this.logout(state, action);
                case UserActionsService.AUTH_FAILURE: return this.authFailure(state, action);
                case UserActionsService.AUTHENTICATED: return this.authenticated(state, action as IUserWithRolesAuthenticatedAction);
            }
            return state != null ? state : { info: null, isAuthenticated: false, isAuthenticating: false };
        }.bind(this);
    }
}
