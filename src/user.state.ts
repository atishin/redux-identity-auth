export interface IUserInfo {
    token: string;
    expirationDate: string;
    userName: string;
}

export interface IUserState {
    isAuthenticated: boolean;
    info: IUserInfo;
}
