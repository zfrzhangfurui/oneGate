import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexPage } from './pages/index/index.page';
import { SiderPage } from './pages/index/sider/sider.page';
import { Test } from './pages/test/test';
const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  // { path: 'test', component: Test },
  {
    path: 'index', component: IndexPage, children: [
      { path: '', redirectTo: 'review', pathMatch: 'full' },
      { path: 'review', loadChildren: () => import('./pages/review/review.module').then(m => m.ReviewModule) },
      { path: 'customer', loadChildren: () => import('./pages/customer-authentication/customer-auth.module').then(m => m.CustomerAuthModule) },
      { path: 'user', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule) },
      { path: 'backend', loadChildren: () => import('./pages/backend/backend.module').then(m => m.BackEndModule) },
      { path: 'goods', loadChildren: () => import('./pages/goods/goods.module').then(m => m.GoodsModule) },
      { path: 'revenue', loadChildren: () => import('./pages/revenue/revenue.module').then(m => m.RevenueModule) },
      { path: 'website', loadChildren: () => import('./pages/website/website.module').then(m => m.WebsiteModule) },
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
