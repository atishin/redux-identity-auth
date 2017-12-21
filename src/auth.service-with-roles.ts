import { IUserState, IUserWithRolesState } from './user.state';
import { NgRedux } from '@angular-redux/store';
import { ILoginModel, UserActionsService, UserWithRolesActionsService } from './user.actions';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { TOKEN_ENDPOINT } from './token.endpoint';

@Injectable()
export class AuthServiceWithRoles<TAppState extends { user: IUserWithRolesState } = { user: IUserWithRolesState }> {
    constructor(
        private ngRedux: NgRedux<TAppState>,
        private http: HttpClient,
        private userActions: UserWithRolesActionsService,
        @Inject(TOKEN_ENDPOINT) private tokenEndpoint: string
    ) { }

    public async login(model: ILoginModel) {
        try {
            const response = await this.http.post<any>(this.tokenEndpoint, new HttpParams({
                fromObject: {
                    grant_type: 'password',
                    ...model
                }
            }).toString()).toPromise();

            let roles = [];

            if (typeof response.roles === 'string') {
                try {
                    roles = JSON.parse(response.roles);
                } catch (ex) {
                    console.error('The "roles" field must be serialized array of string');
                }
            } else {
                roles = response.roles || [];
            }

            this.ngRedux.dispatch(this.userActions.authenticated({
                token: response.access_token,
                expirationDate: response['.expires'],
                userName: response.userName,
                roles
            }));
        } catch (ex) {
            this.ngRedux.dispatch(this.userActions.authFailure());
        }
    }
}
