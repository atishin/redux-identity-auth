import { IUserState } from './user.state';
import { NgRedux } from '@angular-redux/store';
import { ILoginModel, UserActionsService } from './user.actions';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { TOKEN_ENDPOINT } from './token.endpoint';

@Injectable()
export class AuthService<TAppState extends { user: IUserState } = { user: IUserState }> {
    constructor(
        private ngRedux: NgRedux<TAppState>,
        private http: HttpClient,
        private userActions: UserActionsService,
        @Inject(TOKEN_ENDPOINT) private tokenEndpoint: string
    ) { }

    public async login(model: ILoginModel) {
        try {
            const request = await this.http.post<any>(this.tokenEndpoint, new HttpParams({
                fromObject: {
                    grant_type: 'password',
                    ...model
                }
            }).toString()).toPromise();

            this.ngRedux.dispatch(this.userActions.authenticated({
                token: request.access_token,
                expirationDate: request['.expires'],
                userName: request.userName
            }));
        } catch (ex) {
            this.ngRedux.dispatch(this.userActions.authFailure());
        }
    }
}
