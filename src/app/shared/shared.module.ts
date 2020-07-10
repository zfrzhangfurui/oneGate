import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { FzDesignModule } from '../core/custom-component/fz-design.module';

const DECLARATIONS =
    [
        CommonModule,
        NzLayoutModule,
        NzTableModule,
        NzPaginationModule,
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
        NzMenuModule,
        NzTagModule,
        NzAlertModule,
        ReactiveFormsModule,
        FormsModule,
        FzDesignModule
    ];
const EXPORTS = DECLARATIONS;

@NgModule({
    // imports: DECLARATIONS,
    exports: EXPORTS,
})
export class SharedModule { }
