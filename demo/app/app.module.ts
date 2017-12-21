import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { createLogger } from 'redux-logger';
import persistState from 'redux-localstorage';
import { combineReducers } from 'redux';
import { userReducer } from '../../src/user.reducer';
import { HttpClientModule } from '@angular/common/http';

const reducers = combineReducers({
    user: userReducer
});
export function rootReducer(state = {}, action) {
    return reducers(state, action);
}
console.log(rootReducer);


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgReduxModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(
        private ngRedux: NgRedux<any>,
        private devTools: DevToolsExtension
    ) {
        console.log('here');
        const enhancers = [
            persistState(),
            ...(devTools.isEnabled ? [devTools.enhancer()] : [])
        ];
        console.log(rootReducer);

        ngRedux.configureStore(reducers, undefined, [createLogger()], enhancers);
    }
}
