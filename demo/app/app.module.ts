import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { createLogger } from 'redux-logger';
import persistState from 'redux-localstorage';
import { combineReducers } from 'redux';
import { UserReducerService, UserWithRolesReducerService } from '../../src/user.reducer';
import { HttpClientModule } from '@angular/common/http';
import { NgReduxIdentityAuthModule } from '../../src/ng-redux-identity-auth.module';
import { TOKEN_ENDPOINT } from '../../src/token.endpoint';
import { AuthService } from '../../src/auth.service';
import { AuthServiceWithRoles } from '../../src/auth.service-with-roles';
import { INITIAL_USER_STATE, INITIAL_USER_WITH_ROLES_STATE } from '../../src/initial.states';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgReduxModule,
        NgReduxIdentityAuthModule
    ],
    providers: [
        { provide: TOKEN_ENDPOINT, useValue: 'https://identity-demo-server.azurewebsites.net/TokenWithRoles' },
        { provide: AuthService, useClass: AuthServiceWithRoles }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(
        private ngRedux: NgRedux<any>,
        private devTools: DevToolsExtension,
        private userReducer: UserWithRolesReducerService
    ) {
        const rootReducer = combineReducers({
            user: userReducer.reducer()
        });

        const enhancers = [
            persistState(),
            ...(devTools.isEnabled ? [devTools.enhancer()] : [])
        ];

        ngRedux.configureStore(rootReducer, {
            user: INITIAL_USER_WITH_ROLES_STATE
        }, [createLogger()], enhancers);
        console.log(ngRedux.getState());
    }
}
