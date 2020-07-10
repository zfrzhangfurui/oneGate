import { NgModule } from '@angular/core';
import { Select } from './select/select';
import { SelectItem } from './select-item/select-item';
const DECLARATIONS = [Select];
@NgModule({
    declarations: DECLARATIONS,
    exports: DECLARATIONS
})

export class SelectModule { }