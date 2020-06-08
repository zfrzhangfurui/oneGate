import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
/********************************************************************/
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
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { OnlyLoggedInUserGuard } from '../../core/guard/only-logged-in.guard';
/********************************************************************/
import { CustomerPage } from './customer.page';
import { CustomerAuthPage } from './customer-auth/customer-auth.page';

@NgModule({
    declarations: [

    ],
    imports: [
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
        NzDescriptionsModule,
        NzModalModule,
        NzMenuModule,
        RouterModule.forChild([{
            path: '',
            component: CustomerPage,
            children: [
                {
                    path: '', redirectTo: 'customer-auth'
                    , pathMatch: 'full'
                }
                ,
                {
                    path: 'customer-auth',
                    // canActivate: [OnlyLoggedInUserGuard],
                    // path: '',
                    component: CustomerAuthPage
                },
                // {
                //     path: 'arts-review/:workid',
                //     //   canActivate: [OnlyLoggedInUserGuard],
                //     component: ReviewDetailPage
                // }
            ]
        }]),

        ReactiveFormsModule,
    ]
})
export class CustomerAuthModule { }
