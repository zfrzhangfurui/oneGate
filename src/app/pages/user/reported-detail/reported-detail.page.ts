import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
/*****************************modal*********************************************/
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModalPage } from '../modal/modal.page';
import { Modal } from '../../../model/user/modal.model';
/*****************************modal*********************************************/

@Component({
  selector: 'app-reported-detail',
  templateUrl: './reported-detail.page.html',
  styleUrls: ['./reported-detail.page.less']
})
export class ReportedDetailPage implements OnInit {
  data$ = this.route.paramMap.pipe(
    switchMap(params => of({
      reportid: 0,
      userid: '123123',
      username: 'furui',
      type: 1,
      audit_state: 0,
    }))
  )



  /*****************************modal*********************************************/
  //#region modal
  createComponentModal(modalType, content, layout): void {
    let title;
    modalType = modalType as Modal;
    console.log(modalType, content);
    switch (modalType) {
      case Modal.ReportViolation: title = '违规删除'; break;
      case Modal.ReportNoneViolation: title = '无违规'; break;
      // case Modal.ReportNoneViolation: title = '封禁用户'; break;
    }
    console.log(title);
    const modal = this.modal.create({
      // nzTitle: title,
      nzContent: ModalPage,
      nzGetContainer: () => document.body,
      nzComponentParams: {
        modalSwitch: modalType,
        content: content,
        title: title,
        subtitle: 'component sub title，will be changed after 2 sec'
      },
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      // nzOnOk: null,
      nzClosable: false,
      // nzFooter: [
      //   {
      //     label: 'change component title from outside',
      //     onClick: componentInstance => {
      //       componentInstance!.title = 'title in inner component is changed';
      //     }
      //   }
      // ],
      // nzFooter: null,
      nzBodyStyle: {
        "height": layout[1]
      },
      nzMaskClosable: false,
      nzWidth: layout[0],
    });
    const instance = modal.getContentComponent();
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => console.log('[afterClose] The result is:', result));

    // delay until modal instance created
    setTimeout(() => {
      instance.subtitle = 'sub title is changed';
    }, 2000);
  }


  //#endregion
  /*****************************modal*********************************************/


  onReportViolation(modalType, content) {
    this.createComponentModal(modalType, content, [600, '470px'])
  }
  onReportNonViolation(modalType, content) {
    this.createComponentModal(modalType, content, [500, '400px'])
  }
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
  }

}
