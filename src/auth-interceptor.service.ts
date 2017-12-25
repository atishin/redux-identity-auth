import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NgRedux } from '@angular-redux/store';
import { IUserState } from './user.state';
import { TOKEN_SUFFIX, GRANT_GET_HEADER_FUNC } from './tokens';
import { GrantProvider } from './grant-providers/grant';

@Injectable()
export class AuthInterceptorService<TState extends { user: IUserState }> implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const state = this.ngRedux.getState();
        if (req.url.toLowerCase().endsWith(this.tokenSuffix.toLowerCase())) {
            return next.handle(req);
        }
        if (state.user.isAuthenticated) {
            let headers = req.headers;
            this.getHeaders(state).forEach(header => headers = headers.set(header.header, header.value));
            const authReq = req.clone({ headers });
            return next.handle(authReq);
        }
        return next.handle(req);

    }

    constructor(
        private ngRedux: NgRedux<TState>,
        @Inject(TOKEN_SUFFIX) private tokenSuffix: string,
        @Inject(GRANT_GET_HEADER_FUNC) private getHeaders: GrantProvider.GetHeadersFunction
    ) { }

}
