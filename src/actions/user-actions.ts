import { Action, AnyAction } from 'redux';
import { Injectable } from '@angular/core';
import { GrantProvider } from './../grant-providers/grant';

export interface IUserLoginAction extends Action {
    model: GrantProvider.ILoginModel;
}

export interface IUserAuthenticatedAction extends Action {
    info: GrantProvider.IUserInfoModel;
}

export interface IUserAuthFailureAction extends Action {
    error: string;
}

@Injectable()
export class UserActionsService<
    TLoginModel extends GrantProvider.ILoginModel = GrantProvider.ILoginModel,
    TAuthenticatedModel extends GrantProvider.IUserAuthenticatedModel = GrantProvider.IUserAuthenticatedModel> {

    static LOGIN = 'LOGIN';
    static LOGOUT = 'LOGOUT';
    static AUTHENTICATED = 'AUTHENTICATED';
    static AUTH_FAILURE = 'AUTH_FAILURE';

    public login(model: TLoginModel): IUserLoginAction {
        return { type: UserActionsService.LOGIN, model };
    }

    public logout(): Action {
        return { type: UserActionsService.LOGOUT };
    }

    public authenticated(model: TAuthenticatedModel): IUserAuthenticatedAction {
        return { type: UserActionsService.AUTHENTICATED, info: model };
    }

    public authFailure(error: string): IUserAuthFailureAction {
        return { type: UserActionsService.AUTH_FAILURE, error };
    }
}
