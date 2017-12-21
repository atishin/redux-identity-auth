import { IUserState, IUserWithRolesState } from './user.state';

export const INITIAL_USER_STATE: IUserState = {
    info: null,
    isAuthenticated: false,
    isAuthenticating: false
};

export const INITIAL_USER_WITH_ROLES_STATE: IUserWithRolesState = {
    info: null,
    isAuthenticated: false,
    isAuthenticating: false
};
