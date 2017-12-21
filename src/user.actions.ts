import { Action } from 'redux';
import { IUserInfo } from './user.state';
import { Injectable } from '@angular/core';


export interface IUserLoginAction extends Action {
    info: IUserInfo;
}

export interface IUserLogoutAction extends Action { }

export type UserAction = IUserLoginAction | IUserLogoutAction;

@Injectable()
export class UserActionsService {

    static LOGIN = 'LOGIN';
    static LOGOUT = 'LOGOUT';

    public login(userInfo: IUserInfo): IUserLoginAction {
        return { type: UserActionsService.LOGIN, info: userInfo };
    }

    public logout(): IUserLogoutAction {
        return { type: UserActionsService.LOGOUT }
    }

}