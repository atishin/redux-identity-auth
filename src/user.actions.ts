import { Action } from 'redux';
import { IUserInfo, IUserWithRolesInfo } from './user.state';
import { Injectable } from '@angular/core';

export interface ILoginModel {
    userName: string;
    password: string;
}

export interface IUserLoginAction extends Action {
    userName: string;
    password: string;
}

export interface IUserAuthenticatedAction extends Action {
    info: IUserInfo;
}

export interface IUserWithRolesAuthenticatedAction extends Action {
    info: IUserWithRolesInfo;
}

export type UserAction = IUserLoginAction | IUserAuthenticatedAction;

@Injectable()
export class UserActionsService {

    static LOGIN = 'LOGIN';
    static LOGOUT = 'LOGOUT';
    static AUTHENTICATED = 'AUTHENTICATED';
    static AUTH_FAILURE = 'AUTH_FAILURE';

    public login(model: ILoginModel): IUserLoginAction {
        return { type: UserActionsService.LOGIN, ...model };
    }

    public logout(): Action {
        return { type: UserActionsService.LOGOUT };
    }

    public authenticated(info: IUserInfo): IUserAuthenticatedAction {
        return { type: UserActionsService.AUTHENTICATED, info };
    }

    public authFailure(): Action {
        return { type: UserActionsService.AUTH_FAILURE };
    }
}

@Injectable()
export class UserWithRolesActionsService {
    static LOGIN = 'LOGIN';
    static LOGOUT = 'LOGOUT';
    static AUTHENTICATED = 'AUTHENTICATED';
    static AUTH_FAILURE = 'AUTH_FAILURE';

    public login(model: ILoginModel): IUserLoginAction {
        return { type: UserActionsService.LOGIN, ...model };
    }

    public logout(): Action {
        return { type: UserActionsService.LOGOUT };
    }

    public authenticated(info: IUserWithRolesInfo): IUserAuthenticatedAction {
        return { type: UserActionsService.AUTHENTICATED, info };
    }

    public authFailure(): Action {
        return { type: UserActionsService.AUTH_FAILURE };
    }
}
