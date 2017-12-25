import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { createLogger } from 'redux-logger';
import persistState from 'redux-localstorage';
import { combineReducers } from 'redux';
import { HttpClientModule } from '@angular/common/http';
import { TOKEN_ENDPOINT, NgReduxIdentityAuthModule, INITIAL_USER_STATE, UserReducerService, HAS_ROLES_IN_RESPONSE } from '../../src/index';

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
        { provide: HAS_ROLES_IN_RESPONSE, useValue: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(
        private ngRedux: NgRedux<any>,
        private devTools: DevToolsExtension,
        private userReducer: UserReducerService
    ) {
        const rootReducer = combineReducers({
            user: userReducer.reducer()
        });

        const enhancers = [
            persistState(),
            ...(devTools.isEnabled ? [devTools.enhancer()] : [])
        ];

        ngRedux.configureStore(rootReducer, {
            user: INITIAL_USER_STATE
        }, [createLogger()], enhancers);
        console.log(ngRedux.getState());
    }
}
