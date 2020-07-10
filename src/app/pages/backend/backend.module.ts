import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
/********************************************************************/

import { NzTreeModule } from 'ng-zorro-antd/tree';
import { OnlyLoggedInUserGuard } from '../../core/guard/only-logged-in.guard';
/********************************************************************/
import { AdminPage } from './admin/admin.page';
import { IconDefinition } from '@ant-design/icons-angular';
import { ReactiveComponentModule } from '../../core/reactive/reactive-component.module';
import { AccountBookFill, AlertFill, AlertOutline, SnippetsOutline, CopyrightOutline, FileImageOutline, FileTextOutline, TagsOutline, ArrowsAltOutline } from '@ant-design/icons-angular/icons';
import { AdminListPage } from './admin-list/admin-list.page';
import { ModalPage } from './modal/modal.page';
const icons: IconDefinition[] = [,
    AccountBookFill, AlertOutline, AlertFill, SnippetsOutline, CopyrightOutline, FileImageOutline, FileTextOutline, TagsOutline, ArrowsAltOutline];

@NgModule({
    declarations: [
        AdminPage,
        AdminListPage,
        ModalPage
    ],
    imports: [
        SharedModule,
        NzTreeModule,
        ReactiveComponentModule,
        RouterModule.forChild(
            [
                { path: '', redirectTo: 'admin', pathMatch: 'full' },
                { path: 'admin', component: AdminPage },
                { path: 'admin-list', component: AdminListPage }
            ]
        )
    ]
})
export class BackEndModule { }
