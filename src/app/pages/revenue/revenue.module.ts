import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule, NgModel } from '@angular/forms';
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
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { OnlyLoggedInUserGuard } from '../../core/guard/only-logged-in.guard';
/********************************************************************/
import { OrderListPage } from './order-list/order-list.page';
import { IconDefinition } from '@ant-design/icons-angular';
import { ReactiveComponentModule } from '../../core/reactive/reactive-component.module';
import { AccountBookFill, AlertFill, AlertOutline, SnippetsOutline, CopyrightOutline, FileImageOutline, FileTextOutline, TagsOutline, ArrowsAltOutline } from '@ant-design/icons-angular/icons';
import { TransRecordsPage } from './trans-records/trans-records.page';
import { RechargeRecordsPage } from './recharge-records/recharge-records.page';
import { WithdrawRecordsPage } from './withdraw-records/withdraw-records.page';
const icons: IconDefinition[] = [,
    AccountBookFill, AlertOutline, AlertFill, SnippetsOutline, CopyrightOutline, FileImageOutline, FileTextOutline, TagsOutline, ArrowsAltOutline];

@NgModule({
    declarations: [
        OrderListPage,
        TransRecordsPage,
        RechargeRecordsPage,
        WithdrawRecordsPage
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
        NzTreeModule,
        ReactiveComponentModule,
        RouterModule.forChild(
            [
                { path: '', redirectTo: 'orderlist', pathMatch: 'full' },
                { path: 'orderlist', component: OrderListPage },
                { path: 'transrecords', component: TransRecordsPage },
                { path: 'rechargerecords', component: RechargeRecordsPage },
                { path: 'withdrawrecords', component: WithdrawRecordsPage },
            ]
        ),
        ReactiveFormsModule,
        FormsModule
    ]
})
export class RevenueModule { }
