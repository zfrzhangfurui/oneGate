import { State, StateContext, Action, Selector } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
// local imports
import { throwError, of } from 'rxjs';
// import { IvoryUnauthorizedError } from '../error';
import {
    Login, Logout, FetchMe
    //  Register, UpdatePublicInformation, FetchMe
} from './user.action';

export interface UserStateModel {
    id: number;
    nickname: string;
}

type Context = StateContext<UserStateModel>;

const defaultUserState = {
    id: -1,
    nickname: 'nanashi',
};

@State<UserStateModel>({
    name: 'user',
    defaults: defaultUserState
})
@Injectable()
export class UserState {

    @Selector()
    static isLogin(state: UserStateModel) {
        return state.id > 0;
    }

    // @Selector()
    // static nickname(state: UserStateModel) {
    //     return state.nickname;
    // }
    // @Selector()
    // static description(state: UserStateModel) {
    //     return state.description;
    // }
    // @Selector()
    // static avatar(state: UserStateModel) {
    //     return state.avatar;
    // }

    // @Selector()
    // static state(state: UserStateModel) {
    //     return state;
    // }

    constructor(private http: HttpClient) { }

    @Action(Login)
    login(ctx: Context, action: Login) {
        return this.http.post('/user/login', {
            a: action.account,
            p: action.password,
            // v: action.verify_code
        })
            .pipe(

                tap(_ => {
                    console.log({ id: 123, nickname: 'jin lai la' });
                    ctx.patchState({ id: 123, nickname: 'jin lai la' });

                }),
                catchError(e => {
                    // if (e instanceof IvoryUnauthorizedError) {
                    //     console.log('not logined');
                    //     return of(undefined);
                    // }
                    return throwError(e);
                })
            )
    }

    @Action(Logout)
    logout(ctx: Context) {
        return this.http.post<void>('/user/logout', null).pipe(
            tap(_ => {
                ctx.setState(defaultUserState)
            })
        );
    }

    // @Action(Register)
    // register(ctx: Context, action: Register) {
    //     return this.http.post<void>('/user/register', {
    //         a: action.account,
    //         p: action.password,
    //         v: action.verify_code
    //     });
    // }

    // @Action(UpdatePublicInformation)
    // updatePublicInfo(ctx: Context, action: UpdatePublicInformation) {
    //     const form = new FormData();
    //     if (action.avatar) {
    //         form.append('a', action.avatar)
    //     }
    //     form.append('n', action.nickname)
    //     form.append('d', action.description)
    //     return this.http.post<{ avatar: string }>('/user/update_public_info', form).pipe(
    //         tap(t => {
    //             ctx.patchState({
    //                 avatar: action.avatar == undefined ? undefined : t.avatar,
    //                 nickname: action.nickname,
    //                 description: action.description
    //             });
    //         })
    //     )
    // }

    // @Action(FetchMe)
    // fetch(ctx: Context) {
    //     return this.http.get<UserStateModel>('/user/me').pipe(
    //         tap(s => {
    //             console.log(s);
    //             ctx.patchState(s);
    //         }),
    //         catchError(e => {
    //             // if (e instanceof IvoryUnauthorizedError) {
    //             //     console.log('not logined');
    //             //     return of(undefined);
    //             // }
    //             return throwError(e);
    //         }),
    //     )
    // }
}