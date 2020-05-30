import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/review/review.module').then(m => m.ReviewModule) },
  { path: 'passport', loadChildren: () => import('./pages/passport/passport.module').then(m => m.PassportModule) },
  { path: 'login', redirectTo: 'passport/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
