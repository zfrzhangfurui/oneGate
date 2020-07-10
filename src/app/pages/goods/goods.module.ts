import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
/********************************************************************/
import { OnlyLoggedInUserGuard } from '../../core/guard/only-logged-in.guard';
/********************************************************************/
import { GoodsPublishedPage } from './goods/goods-published.page';
import { IconDefinition } from '@ant-design/icons-angular';
import { AccountBookFill, AlertFill, AlertOutline, SnippetsOutline, CopyrightOutline, FileImageOutline, FileTextOutline, TagsOutline, ArrowsAltOutline } from '@ant-design/icons-angular/icons';
import { ReactiveComponentModule } from '../../core/reactive/reactive-component.module';
import { GoodsDetailPage } from './goods-detail/goods-detail.page';
const icons: IconDefinition[] = [,
    AccountBookFill, AlertOutline, AlertFill, SnippetsOutline, CopyrightOutline, FileImageOutline, FileTextOutline, TagsOutline, ArrowsAltOutline];

@NgModule({
    declarations: [
        GoodsPublishedPage,
        GoodsDetailPage
    ],
    imports: [
        SharedModule,
        ReactiveComponentModule,
        RouterModule.forChild(
            [
                { path: '', redirectTo: 'goods-published', pathMatch: 'full' },
                { path: 'goods-published', component: GoodsPublishedPage },
                { path: 'goods-detail/:workid', component: GoodsDetailPage }
            ]
        ),
    ]
})
export class GoodsModule { }
