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
import { NzTagModule } from 'ng-zorro-antd/tag';
import { OnlyLoggedInUserGuard } from '../../core/guard/only-logged-in.guard';
/********************************************************************/
import { GoodsPage } from './goods/goods.page';
import { IconDefinition } from '@ant-design/icons-angular';
import { AccountBookFill, AlertFill, AlertOutline, SnippetsOutline, CopyrightOutline, FileImageOutline, FileTextOutline, TagsOutline, ArrowsAltOutline } from '@ant-design/icons-angular/icons';
import { ReactiveComponentModule } from '../../core/reactive/reactive-component.module';
import { GoodsDetailPage } from './goods-detail/goods-detail.page';
const icons: IconDefinition[] = [,
    AccountBookFill, AlertOutline, AlertFill, SnippetsOutline, CopyrightOutline, FileImageOutline, FileTextOutline, TagsOutline, ArrowsAltOutline];

@NgModule({
    declarations: [
        GoodsPage,
        GoodsDetailPage
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
        NzTagModule,
        ReactiveComponentModule,
        RouterModule.forChild(
            [
                { path: '', redirectTo: '', pathMatch: 'full' },
                { path: ':type', component: GoodsPage },
                { path: 'goods-detail/:id', component: GoodsDetailPage }
            ]
        ),

        ReactiveFormsModule,
        FormsModule
    ]
})
export class GoodsModule { }
