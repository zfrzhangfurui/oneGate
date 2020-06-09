import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from '../../shared/reuse-strategy';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { ReviewPage } from './review.page';
import { ArtsReviewPage } from './arts-review/arts-review.page';
import { ReviewDetailPage } from './review-detail/review-detail.page';
/********************************************************************/
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
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
import { IconDefinition } from '@ant-design/icons-angular';
import { AccountBookFill, AlertFill, AlertOutline, ArrowsAltOutline } from '@ant-design/icons-angular/icons';
import { OnlyLoggedInUserGuard } from '../../core/guard/only-logged-in.guard';
import { OnlyNumberDirective } from '../../shared/only-number.directive';
const icons: IconDefinition[] = [,
    AccountBookFill, AlertOutline, AlertFill, ArrowsAltOutline];
@NgModule({
    declarations: [
        OnlyNumberDirective,
        ReviewPage,
        ArtsReviewPage,
        ReviewDetailPage
    ],
    imports: [
        CommonModule,
        // HttpClientModule,
        NzLayoutModule,
        NzTableModule,
        NzPaginationModule,
        NzDividerModule,
        NzButtonModule,
        NzIconModule.forChild(icons),
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
        RouterModule.forChild([{
            path: '',
            component: ReviewPage,
            children: [
                {
                    path: '', redirectTo: 'arts-review'
                    , pathMatch: 'full'
                }
                ,
                {
                    path: 'arts-review',
                    // canActivate: [OnlyLoggedInUserGuard],
                    // path: '',
                    component: ArtsReviewPage
                },
                {
                    path: 'arts-review/:workid',
                    //   canActivate: [OnlyLoggedInUserGuard],
                    component: ReviewDetailPage
                }
            ]
        }]),

        ReactiveFormsModule,
    ],
    providers: [{ provide: RouteReuseStrategy, useClass: CustomReuseStrategy }],
})
export class ReviewModule { }
