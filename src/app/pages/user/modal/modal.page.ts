import { OnInit } from '@angular/core';
import { Component, Input, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Modal, tableConfig } from '../../../model/user/modal.model';
import { of, BehaviorSubject, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const tableConfig: tableConfig = {
    pageIndex: 1,
    pageSize: 2
}

@Component({
    selector: 'modal',
    templateUrl: './modal.page.html',
    styleUrls: ['./modal.page.less']
})
export class ModalPage implements OnInit {
    @Input() content?;
    @Input() title?: string;
    @Input() subtitle?: string;
    @Input() modalSwitch?: Modal;
    violationInfo: string = 'lucy';
    tableConfig: tableConfig = tableConfig;
    tableConfig$ = new Subject();
    tableData$ = this.tableConfig$.pipe(switchMap(tableConfig => {
        return of([
            {
                starttime: Date(),
                day: 30,
                description: "this is a banned description",
                endtime: Date()
            },
            {
                starttime: Date(),
                day: 30,
                description: "this is a banned description",
                endtime: Date()
            },
            {
                starttime: Date(),
                day: 30,
                description: "this is a banned description",
                endtime: Date()
            },
            {
                starttime: Date(),
                day: 30,
                description: "this is a banned description",
                endtime: Date()
            }
        ])
    }));
    total: number = 1;
    tableLoadingToggle: boolean = false;
    // tableData$ = of([
    //     1, 2, 3, 4, 5, 6, 7
    // ]);
    onQueryParamsChange(event) {
        if (this.modalSwitch = Modal.BannedRecord) {
            this.tableConfig$.next(tableConfig)
        }
    }

    displayCounter(event) {
        console.log(event);
    }
    constructor(private modal: NzModalRef) { }

    destroyModal(): void {
        this.modal.destroy({ data: 'this the result data' });
    }

    ngOnInit() {
        console.log(this.title, this.modalSwitch);
    }
}