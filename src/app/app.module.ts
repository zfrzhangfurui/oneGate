import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule, NoopNgxsExecutionStrategy } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { ReviewModule } from './pages/review/review.module';
import { PassportModule } from './pages/passport/passport.module';
import { CustomerAuthModule } from './pages/customer-authentication/customer-auth.module';
import { UserModule } from './pages/user/user.module';
import { BackEndModule } from './pages/backend/backend.module';
import { GoodsModule } from './pages/goods/goods.module';
import { RevenueModule } from './pages/revenue/revenue.module';
import { WebsiteModule } from '../app/pages/website/website.module';
import { CoreModule } from './core/core.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from 'ng-zorro-antd/menu';
import zh from '@angular/common/locales/zh';
import { IndexPage } from './pages/index/index.page';
import { SiderPage } from './pages/index/sider/sider.page';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
/***********************************************************************/
import { IconDefinition } from '@ant-design/icons-angular';
import { AccountBookFill, AlertFill, AlertOutline, SnippetsOutline, CopyrightOutline, FileImageOutline, FileTextOutline, TagsOutline, ArrowsAltOutline } from '@ant-design/icons-angular/icons';
const icons: IconDefinition[] = [,
  AccountBookFill, AlertOutline, AlertFill, SnippetsOutline, CopyrightOutline, FileImageOutline, FileTextOutline, TagsOutline, ArrowsAltOutline];

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    IndexPage,
    SiderPage,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReviewModule,
    CustomerAuthModule,
    PassportModule,
    UserModule,
    BackEndModule,
    GoodsModule,
    RevenueModule,
    WebsiteModule,
    NzLayoutModule,
    NzMenuModule,
    NzSwitchModule,
    CoreModule.forRoot({
      api_gateway: environment.api_gateway
    }),
    NgxsModule.forRoot([], {
      developmentMode: !environment.production,
      // executionStrategy: NoopNgxsExecutionStrategy
    }),
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
