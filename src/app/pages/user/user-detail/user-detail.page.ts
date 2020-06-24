import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, pipe, of, combineLatest, Observable } from 'rxjs';
import { tap, switchMap, pluck } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserDetail } from '../../../model/user/user.detail.model';
import * as moment from 'moment';
/*****************************modal*********************************************/
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModalPage } from '../modal/modal.page';
import { Modal } from '../../../model/user/modal.model';
/*****************************modal*********************************************/


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.less']
})
export class UserDetailPage implements OnInit {
  moment = moment;
  status: number;
  param$ = this.route.paramMap.pipe(
    switchMap(params => {
      let uid = +params.get('uid');
      return this.http.get<any>(`/user/get_user_detail?u=${uid}`)
    }), tap(data => {
      this.status = data.state.user_status;
    })
  )

  backToList() {
    this.router.navigate(['../../userlist'], { relativeTo: this.route });
  }


  /*****************************modal*********************************************/
  //#region modal
  createComponentModal(modalType, content): void {
    let title;
    modalType = modalType as Modal;
    console.log(modalType);
    switch (modalType) {
      case Modal.BannedRecord: title = '封禁记录'; break;
    }
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
      // nzFooter: [
      //   {
      //     label: 'change component title from outside',
      //     onClick: componentInstance => {
      //       componentInstance!.title = 'title in inner component is changed';
      //     }
      //   }
      // ]
      nzFooter: null,
      nzBodyStyle: {
        "height": "600px"
      },
      nzWidth: 1000,
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



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.param$.subscribe(
      data => {
        console.log(data);
      }
    )
  }

}
