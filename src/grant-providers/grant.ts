import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserState } from '../user.state';

@Injectable()
export class GrantProvider {
    constructor(protected http: HttpClient) { }

    public async signIn(model: GrantProvider.IGrantModel): Promise<any> {
        console.warn('Provide "GrantProvider"');
    }

    public getHeaders(): GrantProvider.IHeader[] {
        return [];
    }
}

export namespace GrantProvider {
    export interface IGrantModel {
        [key: string]: any;
    }
    export interface IHeader {
        header: string;
        value: string;
    }
    export interface ILoginModel {
        [key: string]: any;
    }
    export interface IUserAuthenticatedModel {
        [key: string]: any;
    }
    export interface IUserInfoModel {
        [key: string]: any;
    }
    export type GetHeadersFunction = <TState extends { user: IUserState }>(state: TState) => IHeader[];
}
