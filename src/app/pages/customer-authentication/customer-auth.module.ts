import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
/********************************************************************/
import { OnlyLoggedInUserGuard } from '../../core/guard/only-logged-in.guard';
/********************************************************************/
import { CustomerPage } from './customer.page';
import { CustomerAuthPage } from './customer-auth/customer-auth.page';
import { CustomerAuthDetailPage } from './customer-auth-detail/customer-auth-detail.page';
import { IconDefinition } from '@ant-design/icons-angular';
import { AccountBookFill, AlertFill, AlertOutline, SnippetsOutline, CopyrightOutline, FileImageOutline, FileTextOutline, TagsOutline, ArrowsAltOutline } from '@ant-design/icons-angular/icons';
const icons: IconDefinition[] = [,
    AccountBookFill, AlertOutline, AlertFill, SnippetsOutline, CopyrightOutline, FileImageOutline, FileTextOutline, TagsOutline, ArrowsAltOutline];

@NgModule({
    declarations: [
        CustomerPage,
        CustomerAuthPage,
        CustomerAuthDetailPage
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([{
            path: '',
            component: CustomerPage,
            children: [
                {
                    path: '', redirectTo: 'customer-auth'
                    , pathMatch: 'full'
                }
                ,
                {
                    path: 'customer-auth',
                    // canActivate: [OnlyLoggedInUserGuard],
                    // path: '',
                    component: CustomerAuthPage
                },
                {
                    path: 'customer-auth/:uid',
                    //   canActivate: [OnlyLoggedInUserGuard],
                    component: CustomerAuthDetailPage
                }
            ]
        }])
    ]
})
export class CustomerAuthModule { }
