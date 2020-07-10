import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from '../../shared/reuse-strategy';
import { ReviewPage } from './review.page';
import { ArtsReviewPage } from './arts-review/arts-review.page';
import { ReviewDetailPage } from './review-detail/review-detail.page';
import { ModalPage } from './review-modal/modal.page';
/********************************************************************/
import { SharedModule } from '../../shared/shared.module';
import { IconDefinition } from '@ant-design/icons-angular';
import { ReactiveComponentModule } from '../../core/reactive/reactive-component.module';
import { AccountBookFill, AlertFill, AlertOutline, SnippetsOutline, CopyrightOutline, FileImageOutline, FileTextOutline, TagsOutline, ArrowsAltOutline } from '@ant-design/icons-angular/icons';
import { OnlyLoggedInUserGuard } from '../../core/guard/only-logged-in.guard';
import { OnlyNumberDirective } from '../../shared/only-number.directive';
import { SelectModule } from '../../core/custom-select/select.module';
// import { FzDesignModule } from '../../core/custom-component/fz-design.module';

const icons: IconDefinition[] = [,
    AccountBookFill, AlertOutline, AlertFill, SnippetsOutline, CopyrightOutline, FileImageOutline, FileTextOutline, TagsOutline, ArrowsAltOutline];
@NgModule({
    declarations: [
        OnlyNumberDirective,
        ReviewPage,
        ArtsReviewPage,
        ReviewDetailPage,
        ModalPage
    ],
    imports: [
        SelectModule,
        SharedModule,
        ReactiveComponentModule,
        // FzDesignModule,
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
                    path: 'arts-review/:workid/:submittype/:version/:mode',
                    //   canActivate: [OnlyLoggedInUserGuard],
                    component: ReviewDetailPage
                }
            ]
        }]),

    ],
    providers: [{ provide: RouteReuseStrategy, useClass: CustomReuseStrategy }],
})
export class ReviewModule { }
