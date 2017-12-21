import { Action } from "redux";
import { UserAction, UserActionsService, IUserLoginAction, IUserLogoutAction } from "./user.actions";
import { IUserState } from "./user.state";

export function userReducer(state: IUserState = { info: null, isAuthenticated: false}, processingAction: UserAction): IUserState {
    switch (processingAction.type) {
        case UserActionsService.LOGIN: {
            const action = processingAction as IUserLoginAction;
            return {
                ...state,
                isAuthenticated: true,
                info: action.info
            }
        }
        case UserActionsService.LOGOUT: {
            const action = processingAction as IUserLogoutAction;
            return {
                ...state,
                isAuthenticated: false,
                info: null
            }
        }
    }
    return state;
}