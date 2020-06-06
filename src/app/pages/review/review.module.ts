import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { ReviewPage } from './review.page';
import { ArtsReviewPage } from './arts-review/arts-review.page';
import { ReviewDetailPage } from './review-detail/review-detail.page';
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
import { OnlyLoggedInUserGuard } from '../../core/guard/only-logged-in.guard';

@NgModule({
    declarations: [
        ReviewPage,
        ArtsReviewPage,
        ReviewDetailPage
    ],
    imports: [
        CommonModule,
        // HttpClientModule,
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
    ]
})
export class ReviewModule { }
