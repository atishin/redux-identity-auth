import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgReduxModule } from '@angular-redux/store';
import { FactoryProvider } from '@angular/core';
import { InjectionToken, ClassProvider } from '@angular/core';
import { AuthHelpers } from './helpers';
import { GrantProvider } from './grant-providers/grant';
import { UserReducerService } from './user.reducer';
import { UserActionsService } from './actions/user-actions';
import { PasswordGrantProvider, getHeaders } from './grant-providers/password.grant';
import { TOKEN_SUFFIX, AUTH_LOGIN_ROUTE, HANDLE_AUTH_ERROR, HAS_ROLES_IN_RESPONSE, GRANT_GET_HEADER_FUNC } from './tokens';
import { AuthorizeGuard } from './authorize.guard';
import { AuthInterceptorService } from './auth-interceptor.service';

export const PUBLIC_SERVICES = [
    UserActionsService,
    UserReducerService,
    AuthHelpers
];

@NgModule({
    imports: [],
    providers: [
        ...PUBLIC_SERVICES,
        <ClassProvider>{ provide: GrantProvider, useClass: PasswordGrantProvider },
        { provide: TOKEN_SUFFIX, useValue: 'token' },
        { provide: GRANT_GET_HEADER_FUNC, useValue: getHeaders },
        { provide: AUTH_LOGIN_ROUTE, useValue: '/auth/login' },
        { provide: HANDLE_AUTH_ERROR, useValue: () => { } },
        { provide: HAS_ROLES_IN_RESPONSE, useValue: false },
        AuthorizeGuard,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
    ]
})
export class NgReduxIdentityAuthModule { }

