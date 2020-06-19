import { Component, Input, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

export enum Modal {
    ModalDeleteRole = 'ModalDeleteRole',
    ModalAddRole = 'ModalAddRole',
    ModalEdit = 'ModalEdit',
    ModalEditPassword = 'ModalEditPassword',

}


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


    constructor(private modal: NzModalRef) { }

    destroyModal(): void {
        this.modal.destroy({ data: 'this the result data' });
    }


}