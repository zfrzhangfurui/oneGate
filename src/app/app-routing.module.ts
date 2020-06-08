import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexPage } from './pages/index/index.page';
import { SiderPage } from './pages/index/sider/sider.page';
const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  {
    path: 'index', component: IndexPage, children: [
      { path: '', redirectTo: 'review', pathMatch: 'full' },
      { path: 'review', loadChildren: () => import('./pages/review/review.module').then(m => m.ReviewModule) },
      { path: 'customer', loadChildren: () => import('./pages/customer-authentication/customer-auth.module').then(m => m.CustomerAuthModule) },
    ]
  },
  { path: 'passport', loadChildren: () => import('./pages/passport/passport.module').then(m => m.PassportModule) },
  { path: 'login', redirectTo: 'passport/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
