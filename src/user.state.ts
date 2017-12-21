export interface IUserInfo {
    token: string;
    expirationDate: string;
    userName: string;
}

export interface IUserWithRolesInfo extends IUserInfo {
    roles: string[];
}

export interface IUserState {
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    info: IUserInfo;
}

export interface IUserWithRolesState {
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    info: IUserWithRolesInfo;
}
