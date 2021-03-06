import { Injectable, Inject } from '@angular/core';
import { GrantProvider } from './grant';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TOKEN_ENDPOINT, HAS_ROLES_IN_RESPONSE } from './../tokens';
import { NgRedux } from '@angular-redux/store';
import { IUserState } from '../user.state';
import { UserActionsService } from '../actions/user-actions';

@Injectable()
export class PasswordGrantProvider extends GrantProvider {
    constructor(
        http: HttpClient,
        @Inject(TOKEN_ENDPOINT) private tokenEndpoint,
        private ngRedux: NgRedux<{ user: IUserState<PasswordGrantProvider.IUserInfoModel> }>,
        @Inject(HAS_ROLES_IN_RESPONSE) private hasRoles: string,
        private userActions: UserActionsService<PasswordGrantProvider.ILoginModel, PasswordGrantProvider.IUserInfoModel>
    ) {
        super(http);
    }

    public async signIn(model: PasswordGrantProvider.IGrantModel) {
        try {
            const response = await this.http.post<any>(this.tokenEndpoint, new HttpParams({
                fromObject: {
                    ...model,
                    grant_type: 'password'
                }
            }).toString()).toPromise();

            let roles = [];

            if (this.hasRoles) {


                if (typeof response.roles === 'string') {
                    try {
                        roles = JSON.parse(response.roles);
                    } catch (ex) {
                        console.error('The "roles" field must be serialized array of string');
                    }
                } else {
                    roles = response.roles || [];
                }

            }

            const info: PasswordGrantProvider.IUserInfoModel = {
                ...response,
                roles
            };

            this.ngRedux.dispatch(this.userActions.authenticated(info));

        } catch (ex) {
            this.ngRedux.dispatch(this.userActions.authFailure('Error during authentication'));
        }

    }


}

export function getHeaders(state: { user: IUserState<PasswordGrantProvider.IUserInfoModel> }): GrantProvider.IHeader[] {
    if (state.user.isAuthenticated) {
        return [{
            header: 'Authorization',
            value: `Bearer ${state.user.info.access_token}`
        }];
    }
}

export namespace PasswordGrantProvider {

    export interface IUserAuthenticatedModel extends GrantProvider.IUserAuthenticatedModel {
        access_token: string;
        userName: string;
        roles?: string;
        '.expires': string;
    }

    export interface IGrantModel extends GrantProvider.IGrantModel {
        userName: string;
        password: string;
    }
    export interface ILoginModel extends GrantProvider.ILoginModel {
        userName: string;
        password: string;
    }

    export interface IUserInfoModel extends GrantProvider.IUserInfoModel {
        access_token: string;
        token_type: string;
        expires_in: number;
        userName: string;
        id: string;
        roles: string[];
        '.issued': string;
        '.expires': string;
    }

}
