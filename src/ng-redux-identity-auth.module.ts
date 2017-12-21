import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UserActionsService, UserWithRolesActionsService } from './user.actions';
import { AuthService } from './auth.service';
import { UserReducerService, UserWithRolesReducerService } from './user.reducer';
import { NgReduxModule } from '@angular-redux/store';
import { FactoryProvider } from '@angular/core';
import { InjectionToken } from '@angular/core';
import { AuthServiceWithRoles } from './auth.service-with-roles';

export const PUBLIC_SERVICES = [
    AuthService, UserActionsService, AuthServiceWithRoles, UserWithRolesActionsService, UserWithRolesReducerService
    //, <FactoryProvider>{
    //     provide: UserReducerService, useFactory: (authService: AuthService, userActions: UserActionsService) => {
    //         return new UserReducerService(authService);
    //     },
    //     deps: [AuthService, UserActionsService, AuthServiceWithRoles, UserWithRolesActionsService]
    // }
];

@NgModule({
    imports: [],
    providers: [...PUBLIC_SERVICES]
})
export class NgReduxIdentityAuthModule { }

