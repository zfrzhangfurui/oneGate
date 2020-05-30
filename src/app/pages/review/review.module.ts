import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ReviewPage } from './review.page';
import { ArtsReviewPage } from './arts-review/arts-review.page';


@NgModule({
    declarations: [
        ReviewPage,
        ArtsReviewPage
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: '',
            component: ReviewPage,
            children: [
                {
                    path: '',
                    component: ArtsReviewPage
                }
            ]
        }]),

        ReactiveFormsModule,
    ]
})
export class ReviewModule { }
