import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
/********************************************************************/
import { SharedModule } from '../../shared/shared.module';
import { OnlyLoggedInUserGuard } from '../../core/guard/only-logged-in.guard';
import { SelectModule } from '../../core/custom-select/select.module';
/********************************************************************/
import { IconDefinition } from '@ant-design/icons-angular';
import { AccountBookFill, AlertFill, AlertOutline, SnippetsOutline, CopyrightOutline, FileImageOutline, FileTextOutline, TagsOutline, ArrowsAltOutline } from '@ant-design/icons-angular/icons';
import { UserPage } from './user/user.page';
import { UserDetailPage } from './user-detail/user-detail.page';
import { ReactiveComponentModule } from '../../core/reactive/reactive-component.module';
import { ViolationPage } from './violation/violation.page';
import { ReportedPage } from './reported/reported.page';
import { ReportedDetailPage } from './reported-detail/reported-detail.page';
import { ModalPage } from './modal/modal.page';
import { ViolationDetailPage } from './violation-detail/violation-detail.page';
const icons: IconDefinition[] = [,
    AccountBookFill, AlertOutline, AlertFill, SnippetsOutline, CopyrightOutline, FileImageOutline, FileTextOutline, TagsOutline, ArrowsAltOutline];

@NgModule({
    declarations: [
        UserPage,
        UserDetailPage,
        ViolationPage,
        ReportedPage,
        ReportedDetailPage,
        ModalPage,
        ViolationDetailPage
    ],
    imports: [
        SharedModule,
        SelectModule,
        ReactiveComponentModule,
        RouterModule.forChild(
            [
                { path: '', redirectTo: 'userlist', pathMatch: 'full' },
                { path: 'userlist', component: UserPage },
                { path: 'userlist/:uid', component: UserDetailPage },
                { path: 'reportlist', component: ReportedPage },
                { path: 'reportlist/:uid', component: ReportedDetailPage },
                { path: 'violationlist', component: ViolationPage },
                { path: 'violationlist/:uid', component: ViolationDetailPage }
            ]
        )
    ]
})
export class UserModule { }
