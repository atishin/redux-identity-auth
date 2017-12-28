import { InjectionToken } from '@angular/core';

export const TOKEN_ENDPOINT = new InjectionToken('nria.token-endpoint');
export const GRANT_GET_HEADER_FUNC = new InjectionToken('nria.grant-get-header-func');
export const TOKEN_SUFFIX = new InjectionToken('nria.token-suffix');
export const AUTH_LOGIN_ROUTE = new InjectionToken('nria.auth-login-route');
export const HANDLE_AUTH_ERROR = new InjectionToken('nria.handle-auth-error');
export const GRANT_PROVIDER = new InjectionToken('nria.grant-provider');
export const HAS_ROLES_IN_RESPONSE = new InjectionToken('nria.has-roles-in-response');

export type ErrorHandler = (error: string) => void;
export const HANDLE_ERROR: ErrorHandler = (error) => console.error(error);
