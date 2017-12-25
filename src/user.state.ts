import { GrantProvider } from './grant-providers/grant';

export interface IUserState<TInfoModel extends GrantProvider.IUserInfoModel = GrantProvider.IUserInfoModel> {
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    info: TInfoModel;
}
