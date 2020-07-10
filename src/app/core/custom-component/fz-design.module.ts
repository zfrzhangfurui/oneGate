import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FzDescriptions } from './description/fz-descriptions/fz-descriptions';
import { FzDescriptionsItem } from './description/fz-descriptions-item/fz-descriptions-item';
import { FzIconDirective } from './description/fz-icon.directive';
import { FzTitle } from './title/fz-title';
import { FzImage } from './image/fz-image/fz-image';
const DECLARATIONS = [FzDescriptions, FzDescriptionsItem, FzIconDirective, FzTitle, FzImage]

@NgModule({
    declarations: DECLARATIONS,
    imports: [CommonModule],
    exports: DECLARATIONS
})

export class FzDesignModule { }