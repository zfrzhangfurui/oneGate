import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { NgxsModule, Store } from '@ngxs/store';
import { UserState } from './state/user.state';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { ToastComponent } from './toast/toast.component';
// import { Toast } from './toast/toast.service';
import { APIInterceptor } from './interceptor/APIinterceptor';
import { API_GATEWAY } from './token';
//import { FetchMe } from './state/user.action';
// import { VerifycodeService } from './service/verifycode.service';
// import { ModalService } from './service/modals.service';

export interface PeachaOptions {
    api_gateway: string;
}

export function appInitializer(store: Store) {
    return () => {
        //  store.dispatch(new FetchMe()).toPromise();
    }
}

@NgModule({
    declarations: [
        // ToastComponent
    ],
    imports: [
        HttpClientModule,
        NgxsModule.forFeature([UserState]),
    ],
    exports: [
        HttpClientModule
    ]
})
export class CoreModule {
    static forRoot(options: PeachaOptions): ModuleWithProviders<CoreModule> {
        return {
            ngModule: CoreModule,
            providers: [
                // Toast,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: APIInterceptor,
                    multi: true
                },
                {
                    provide: API_GATEWAY,
                    useValue: options.api_gateway
                }, {
                    provide: APP_INITIALIZER,
                    useFactory: appInitializer,
                    deps: [Store],
                    multi: true
                },
                // VerifycodeService,
                // ModalService
            ]
        };
    }
}