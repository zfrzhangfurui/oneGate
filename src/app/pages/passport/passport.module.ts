import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
/***************************************************************/
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from "ng-zorro-antd/form";
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        CommonModule,
        NzLayoutModule,
        NzTableModule,
        NzDividerModule,
        NzButtonModule,
        NzIconModule,
        NzInputModule,
        NzDatePickerModule,
        NzFormModule,
        NzSelectModule,
        NzRadioModule,
        NzGridModule,
        RouterModule.forChild([{
            path: '',
            component: LoginComponent,
            children: [
                // {
                //     path: '',
                //     component: UserProfilePage
                // }, {
                //     path: 'security',
                //     component: UserSecurityPage
                // },
                // {
                //     path: 'security/reset_password',
                //     component: UserResetPage
                // },
                // {
                //     path: 'security/checkset',
                //     component: CheckResetComponent
                // },
            ]
        }]),

        ReactiveFormsModule,
    ]
})
export class PassportModule { }
