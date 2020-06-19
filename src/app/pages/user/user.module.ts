import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { IconDefinition } from '@ant-design/icons-angular';
import { AccountBookFill, AlertFill, AlertOutline, SnippetsOutline, CopyrightOutline, FileImageOutline, FileTextOutline, TagsOutline, ArrowsAltOutline } from '@ant-design/icons-angular/icons';
import { UserPage } from './user/user.page';
import { UserDetailPage } from './user-detail/user-detail.page';
import { ReactiveComponentModule } from '../../core/reactive/reactive-component.module';
import { ViolationPage } from './violation/violation.page';
import { ReportedPage } from './reported/reported.page';
import { ReportedDetailPage } from './reported-detail/reported-detail.page';
const icons: IconDefinition[] = [,
    AccountBookFill, AlertOutline, AlertFill, SnippetsOutline, CopyrightOutline, FileImageOutline, FileTextOutline, TagsOutline, ArrowsAltOutline];

@NgModule({
    declarations: [
        UserPage,
        UserDetailPage,
        ViolationPage,
        ReportedPage,
        ReportedDetailPage
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
        ReactiveComponentModule,
        RouterModule.forChild(
            [
                { path: '', redirectTo: 'userlist', pathMatch: 'full' },
                { path: 'userlist', component: UserPage },
                { path: 'userlist/:uid', component: UserDetailPage },
                { path: 'reportlist', component: ReportedPage },
                { path: 'reportlist/:uid', component: ReportedDetailPage },
                { path: 'violationlist', component: ViolationPage }
            ]
        ),

        ReactiveFormsModule,
        FormsModule
    ]
})
export class UserModule { }
