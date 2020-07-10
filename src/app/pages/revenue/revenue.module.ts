import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/********************************************************************/
import { SharedModule } from '../../shared/shared.module';
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
        SharedModule,
        ReactiveComponentModule,
        RouterModule.forChild(
            [
                { path: '', redirectTo: 'orderlist', pathMatch: 'full' },
                { path: 'orderlist', component: OrderListPage },
                { path: 'transrecords', component: TransRecordsPage },
                { path: 'rechargerecords', component: RechargeRecordsPage },
                { path: 'withdrawrecords', component: WithdrawRecordsPage },
            ]
        )
    ]
})
export class RevenueModule { }
