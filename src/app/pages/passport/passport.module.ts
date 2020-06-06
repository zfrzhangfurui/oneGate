import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './login/login.page';
/***************************************************************/
import { NZ_I18N } from "ng-zorro-antd/i18n";
import { zh_CN } from "ng-zorro-antd/i18n";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
    declarations: [LoginPage],
    imports: [

        CommonModule,
        NzButtonModule,
        NzInputModule,
        NzFormModule,
        NzIconModule,
        ReactiveFormsModule,
        RouterModule.forChild([{
            path: '',
            redirectTo: 'login',
            pathMatch:'full'
        },
        { path: 'login', component: LoginPage }
        ]),
    ],
    providers: [{ provide: NZ_I18N, useValue: zh_CN }]
})
export class PassportModule { }
