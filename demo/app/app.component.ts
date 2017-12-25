import { Component } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { PasswordGrantProvider, UserActionsService } from '../../src/index';

@Component({
    selector: 'nria-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    @select(['user', 'isAuthenticated']) isAuthenticated$: Observable<boolean>;
    @select(['user', 'info']) userInfo$: Observable<PasswordGrantProvider.IUserInfoModel>;
    title = 'nria';

    constructor(
        private ngRedux: NgRedux<any>,
        private userActions: UserActionsService,
        private http: HttpClient
    ) { }

    logout() {
        this.ngRedux.dispatch(this.userActions.logout());
    }

    login() {
        this.ngRedux.dispatch(this.userActions.login({
            userName: 'admin@identity.demo',
            password: 'Admin123##'
        }));
    }
}
