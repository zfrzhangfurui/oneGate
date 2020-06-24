import { Component, Input, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Modal, tableConfig } from '../../../model/user/modal.model';
import { of } from 'rxjs';



@Component({
    selector: 'modal',
    templateUrl: './modal.page.html',
    styles: []
})
export class ModalPage {
    @Input() content?;
    @Input() title?: string;
    @Input() subtitle?: string;
    @Input() modalSwitch?: Modal;
    tableConfig: tableConfig = {
        pageIndex: 1,
        pageSize: 2
    }
    total: number = 1;
    tableLoadingToggle: boolean = false;
    tableData$ = of([
        1, 2, 3, 4, 5, 6, 7
    ]);
    onQueryParamsChange(event) { }
    constructor(private modal: NzModalRef) { }

    destroyModal(): void {
        this.modal.destroy({ data: 'this the result data' });
    }
}