import { Component, OnInit, TemplateRef } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree'
/*****************************modal*********************************************/
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModalPage } from '../modal/modal.page';
/*****************************modal*********************************************/
export enum Modal {
  ModalDeleteRole = 'ModalDeleteRole',
  ModalAddRole = 'ModalAddRole',
  ModalEdit = 'ModalEdit',
  ModalEditPassword = 'ModalEditPassword',

}
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.less']
})
export class AdminPage implements OnInit {
  adminSubject$ = new BehaviorSubject('init');
  tableData$ = this.adminSubject$.pipe(switchMap(data => {

    return of(
      [
        { id: 1, name: 'Furui', description: '123123123123123123' },
        { id: 2, name: '张三', description: '123123123123123123' },
        { id: 3, name: '李四', description: '123123123123123123' },
        { id: 4, name: '王五', description: '123123123123123123' }
      ]
    )
    // return this.http.get<>().........
  }))

  //defaultKeys = ['0'];
  defaultKeys = [];
  Keys = [];
  nodes = [
    {
      title: '1. 审核管理',
      key: '0',
      expanded: true,
      selectable: false,
      children: [
        {
          title: '1.1 作品审核',
          key: '0-0',
          isLeaf: true,
          selectable: false,
        },
        {
          title: '1.2 实名认证审核',
          key: '0-1',
          isLeaf: true,
          selectable: false,
        },
      ]
    },
    {
      title: '2. 内容管理',
      key: '1',
      expanded: true,
      selectable: false,
      children: [
        { title: '2.1 已发布作品', key: '1-0', isLeaf: true, selectable: false },
        { title: '2.2 已删除作品', key: '1-1', isLeaf: true, selectable: false },
        { title: '2.3 已上架商品', key: '1-2', isLeaf: true, selectable: false },
        { title: '2.4 已出售商品', key: '1-3', isLeaf: true, selectable: false },
        { title: '2.5 已删除商品', key: '1-4', isLeaf: true, selectable: false },
        { title: '2.6 合集列表', key: '1-5', isLeaf: true, selectable: false }
      ]
    },
    {
      title: '3. 财务管理',
      key: '2',
      expanded: true,
      selectable: false,
      children: [
        { title: '3.1 订单列表', key: '2-0', isLeaf: true, selectable: false },
        { title: '3.2 交易记录', key: '2-1', isLeaf: true, selectable: false },
        { title: '3.3 充值记录', key: '2-2', isLeaf: true, selectable: false },
        { title: '3.4 提现记录', key: '2-3', isLeaf: true, selectable: false },
      ]
    },
    {
      title: '4. 用户管理',
      key: '3',
      expanded: true,
      selectable: false,
      children: [
        { title: '4.1 用户列表', key: '3-0', isLeaf: true, selectable: false },
        { title: '4.2 举报记录', key: '3-1', isLeaf: true, selectable: false },
        { title: '4.3 违规记录', key: '3-2', isLeaf: true, selectable: false },
      ]
    },
    {
      title: '5. 网站管理',
      key: '4',
      expanded: true,
      selectable: false,
      children: [
        { title: '4.1 Banner', key: '4-0', isLeaf: true, selectable: false },
      ]
    },
    {
      title: '6. 后台管理',
      key: '5',
      expanded: true,
      selectable: false,
      children: [
        { title: '6.1 角色权限', key: '5-0', isLeaf: true, selectable: false },
        { title: '6.2 用户管理', key: '5-1', isLeaf: true, selectable: false },
      ]
    }
  ];

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
    console.log(this.defaultKeys);
    this.Keys = event.keys;
  }
  roleSetting() {

  }
  /*****************************modal*********************************************/

  createComponentModal(modalType, content): void {
    let title;
    modalType = modalType as Modal;
    console.log(modalType);
    switch (modalType) {
      case Modal.ModalDeleteRole: title = '删除角色'; break;
      case Modal.ModalAddRole: title = '新增角色'; break;
      case Modal.ModalEdit: title = '删除用户'; break;
      case Modal.ModalEditPassword: title = '新增用户'; break;
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









  constructor(
    private http: HttpClient,
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
  }

}
