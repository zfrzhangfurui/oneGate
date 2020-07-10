import { Component, Input, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Modal } from '../../../model/arts-review/singleArt.model';
import { HttpClient } from '@angular/common/http';
import { promise } from 'protractor';
import { resolve } from 'dns';

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
    isConfirmLoading: boolean = false;
    comments: string = '';
    handleCancel() {
        this.modal.close()
    }
    handleOk() {
        this.isConfirmLoading = true;
        console.log(this.modalSwitch);
        console.log(this.comments);
        let access;
        if (this.modalSwitch === Modal.auditAccepted) {
            access = 1;
        } else if (this.modalSwitch === Modal.auditDeclined) {
            access = 2;
        } else if (this.modalSwitch === Modal.cancelPublish) {
            access = 2;
        } else if (this.modalSwitch === Modal.displayImage) {
            access = 100;
        }
        if (access === 100) {
            setTimeout(() => {
                this.isConfirmLoading = false;
                this.modal.destroy();
            }, 1000);
        } else {
            this.onAuditWork(access, this.comments).subscribe(data => {
                setTimeout(() => {
                    this.isConfirmLoading = false;
                    this.modal.destroy(this.content[0]);
                }, 1000);

            }, err => {
                setTimeout(() => {
                    this.isConfirmLoading = false;
                    console.log(err, '出错啦')
                }, 1000);

            })
        }


    }

    onAuditWork(access, comments) {
        console.log(access, comments);
        return this.http.post('/work/audit_work', { w: this.content[0], s: access, d: comments });
    }
    constructor(
        private modal: NzModalRef,
        private http: HttpClient
    ) { }

    // destroyModal(): void {
    //     this.modal.destroy({ data: 'this the result data' });
    // }


}