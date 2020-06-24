import { Component, OnInit } from '@angular/core';
import { of, Subject } from 'rxjs';
import { TableConfig } from '../../../model/admin-list.model';
/*****************************modal*********************************************/
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModalPage } from '../modal/modal.page';
/*****************************modal*********************************************/
export enum Modal {
  ModalDeleteRole = 'ModalDeleteRole',
  ModalAddRole = 'ModalAddRole',
  ModalEdit = 'ModalEdit',
  ModalEditPassword = 'ModalEditPassword',
  ModalDeleteMember = 'ModalDeleteMember',
  ModalAddMember = 'ModalAddMember'
}

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.page.html',
  styleUrls: ['./admin-list.page.less']
})
export class AdminListPage implements OnInit {
  total: number = 0;
  tableLoadingToggle: boolean = false;
  tableConfig: TableConfig = {
    pageIndex: 1,
    pageSize: 2
  }
  tableConfig$: Subject<TableConfig> = new Subject();

  tableData$ = of([
    {
      id: 1,
      account: '123',
      name: '456',
      role: 'admin'
    },
    {
      id: 2,
      account: '123',
      name: '456',
      role: 'admin'
    },
    {
      id: 3,
      account: '123',
      name: '456',
      role: 'admin'
    },
    {
      id: 4,
      account: '123',
      name: '456',
      role: 'admin'
    }
  ])
  onQueryParamsChange(event) {
  }
  /*****************************modal*********************************************/

  createComponentModal(modalType, content): void {
    let title;
    modalType = modalType as Modal;
    console.log(modalType);
    switch (modalType) {
      case Modal.ModalDeleteRole: title = '删除角色'; break;
      case Modal.ModalAddRole: title = '新增角色'; break;
      case Modal.ModalEdit: title = '编辑用户'; break;
      case Modal.ModalEditPassword: title = '编辑密码'; break;
      case Modal.ModalDeleteMember: title = '删除用户'; break;
      case Modal.ModalAddMember: title = '添加成员'; break;
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
      nzFooter: [
        {
          label: 'change component title from outside',
          onClick: componentInstance => {
            componentInstance!.title = 'title in inner component is changed';
          }
        }
      ]
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
  /*****************************modal*********************************************/
  constructor(private modal: NzModalService) { }
  ngOnInit(): void {
  }
}
