import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, pipe, of, combineLatest, Observable } from 'rxjs';
import { tap, switchMap, pluck } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserDetail, TableConfig } from '../../../model/user/user.detail.model';
import * as moment from 'moment';
/*****************************modal*********************************************/
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModalPage } from '../modal/modal.page';
import { Modal } from '../../../model/user/modal.model';
/*****************************modal*********************************************/
const tableConfig: TableConfig = {
  pageIndex: 1,
  pageSize: 2
}

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.less']
})
export class UserDetailPage implements OnInit {
  moment = moment;
  status: number;
  // param$ = this.route.paramMap.pipe(
  //   switchMap(params => {
  //     let uid = +params.get('uid');
  //     return this.http.get<any>(`/user/get_user_detail?u=${uid}`)
  //   }), tap(data => {
  //     this.status = data.state.user_status;
  //   })
  // )
  param$ = this.route.paramMap.pipe(
    switchMap(params => {
      let uid = +params.get('uid');
      return of({
        base_info: {
          uid: 10007,
          nickname: "Furui",
          register_time: Date(),
          email: 'zfrzhangfurui@gmail.com',
          phone: '0475811125',
          wallet: "qwe",
          balance: 123,
          authentication_result: 0
        },
        state: {
          user_status: 0,
          day: 0,
          start_time: Date(),
          end_time: Date(),
          description: "this is description"
        },
        identity: {
          realname: "furui",
          cardno: 123567890
        }
      }).pipe(tap(data => {
        this.status = data.state.user_status;
      }))
    })
  )
  backToList() {
    this.router.navigate(['../../userlist'], { relativeTo: this.route });
  }

  onBanUser(modalType, content) {
    //createComponentModal(modalType:Modal, content:any, layout:[width:number, height:string])
    this.createComponentModal(modalType, content, [564, '400px']);
  }
  onReleaseUser(modalType, content) {
    this.createComponentModal(modalType, content, [564, '400px']);
  }
  /*****************************modal*********************************************/
  //#region modal
  createComponentModal(modalType, content, layout): void {
    let title;
    modalType = modalType as Modal;
    console.log(modalType, content);
    switch (modalType) {
      case Modal.BannedRecord: title = '封禁记录'; break;
      case Modal.UserBanned: title = '封禁用户'; break;
      case Modal.UserBannedRelease: title = '解封用户'; break;
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

  /***********************table******************************************/
  total: number = 1;
  tableLoadingToggle: boolean = false;
  tableConfig: TableConfig = tableConfig;
  tableData$ = of([1, 2, 3, 4, 5, 6, 7])
  onQueryParamsChange(event) {

  }
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
